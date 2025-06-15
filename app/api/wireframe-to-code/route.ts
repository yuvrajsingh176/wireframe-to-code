import { db } from "@/configs/db";
import { WireFrametoCodeTable } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { description, imageUrl, model, uid, email } = await req.json();

    const result = await db.insert(WireFrametoCodeTable).values({
        uid: uid,
        createdBy: email,
        description: description,
        imageUrl: imageUrl,
        model: model
    }).returning({ id: WireFrametoCodeTable.id });
    return NextResponse.json(result, { status: 200 })
}


export async function GET(req: NextRequest) {
    const reqUrl = req.url;
    const { searchParams } = new URL(reqUrl);
    const uid = searchParams.get('uid') || '';
    const email = searchParams.get('email');

    if (!email) {
        const result = await db.select().from(WireFrametoCodeTable).where(eq(WireFrametoCodeTable.uid, uid));
        return NextResponse.json(result, { status: 200 });
    } else {
        const result = await db.select().from(WireFrametoCodeTable).where(eq(WireFrametoCodeTable.createdBy, email));
        return NextResponse.json(result, { status: 200 });
    }
}

export async function PUT(req: NextRequest) {
    const { uid, codeResp, model } = await req.json();

    const result = await db.update(WireFrametoCodeTable).set({ code: codeResp, model: model }).where(eq(WireFrametoCodeTable.uid, uid)).returning({ uid: WireFrametoCodeTable.uid });

    return NextResponse.json(result, { status: 200 });
}