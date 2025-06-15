export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';


import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log(
    process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET
)

interface CloudinaryUploadResult {
    public_id: string;
    [key: string]: any;
}

export async function POST(req: NextRequest) {
    try {
        const formdata = await req.formData();
        const file = formdata.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: "file not found" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Convert to base64 string
        const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;

        const result = await cloudinary.uploader.upload(base64Image, {
            folder: 'wireframe Images',
        });

        return NextResponse.json({ public_id: result.public_id }, { status: 200 });

    } catch (e) {
        console.error('Image upload failed:', e);
        return NextResponse.json({ error: e instanceof Error ? e.message : 'Unknown error' }, { status: 500 });
    }
}