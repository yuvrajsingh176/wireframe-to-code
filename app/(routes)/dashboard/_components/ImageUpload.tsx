'use client'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CloudUploadIcon, Loader2Icon, X } from "lucide-react"
import Image from "next/image"
import { ChangeEvent, useContext, useState } from "react";
import axios from "axios";
import { cloudinaryUrl } from "@/configs/cloudinary";
import uuid4 from 'uuid4';
import { useAuthContext } from "@/app/provider";
import { useRouter } from "next/navigation";
import constant from "@/constants/constant";
import { Appcontext } from "@/context/Appcontext";


const ImageUpload = () => {
    const { user } = useAuthContext();
    const [file, setFile] = useState<any>();
    const [fileurl, setFileUrl] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const { model, setModel } = useContext(Appcontext);

    const [description, setDescription] = useState('');
    const router = useRouter();

    const onImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setFile(files);
            const url = URL.createObjectURL(files[0]);
            setFileUrl(url)
        }
    };

    const UploadImage = async () => {

        if (!file || file.length === 0 || !model || !description) {
            console.log('select all fields');
            return;
        }
        setLoading(true)

        const formData = new FormData();
        formData.append("file", file[0]);

        try {
            const res = await axios.post("/api/upload-image", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            const imageUrl = `${cloudinaryUrl}${encodeURIComponent(res?.data?.public_id)}`;
            //save info to db
            const uid = uuid4();
            const dbresult = await axios.post('/api/wireframe-to-code', {
                description: description, imageUrl, model, uid, email: user?.email
            });

            setLoading(false);
            router.push('/view-code/' + uid);
        } catch (err) {
            setLoading(false)
            console.error("Upload error:", err);

        }
    };

    return (
        <div className="mt-10 px-4 md:px-10 max-w-screen-xl mx-auto">
            {/* Two-column responsive layout */}
            <div className="flex flex-col md:flex-row items-start md:items-stretch justify-center gap-8 w-full">

                {/* Upload Box */}
                <div className="p-6 border border-dashed rounded-lg shadow-md flex flex-col justify-center items-center w-full md:w-1/2 bg-white">
                    {fileurl.length === 0 ? (
                        <div className="flex flex-col justify-around items-center w-full h-full">
                            <div className="flex flex-col justify-center items-center h-1/2 md:h-full">
                                <CloudUploadIcon className="w-10 h-10 text-gray-500" />
                                <h2 className="font-bold text-lg mt-2">Upload Image</h2>
                                <p className="text-gray-400 mt-1 mb-4 text-center text-sm">Select a wireframe image to convert</p>
                            </div>

                            <div className="p-4 border border-dashed w-full flex items-center h-1/2 md:h-full justify-center rounded-md bg-gray-50">
                                <label htmlFor="fileUpload" className="cursor-pointer">
                                    <span className="px-4 py-2 bg-primary text-white rounded-md text-sm">Select Image</span>
                                </label>
                                <input onChange={onImageSelect} type="file" id="fileUpload" className="hidden" />

                            </div>

                        </div>
                    ) : (
                        <div className="mt-4 w-full">
                            <Image
                                src={fileurl}
                                alt="Uploaded image"
                                height={300}
                                width={300}
                                className="border-2 rounded-md object-contain mx-auto"
                            />
                            <div className="flex justify-center mt-4 text-red-600">
                                <X
                                    onClick={() => {
                                        setFile(null);
                                        setFileUrl('');
                                    }}
                                    className={`${loading ? 'hidden' : ''} w-8 h-8 cursor-pointer`}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Model Selection and Description */}
                <div className="p-6 border rounded-lg shadow-md flex flex-col justify-start w-full md:w-1/2 bg-white">
                    <h2 className="font-bold text-lg mb-3">Select AI Model</h2>

                    <Select onValueChange={(value) => setModel(value)}>
                        <SelectTrigger className="w-full h-10">
                            <SelectValue placeholder="Select AI Model" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Models</SelectLabel>
                                {constant.AiModelList.map((model) => (
                                    <SelectItem key={model.name} value={model.name}>
                                        <div className="flex gap-2 items-center text-sm">
                                            <Image src={model.icon} height={25} width={25} alt="icon" />
                                            <span>{model.name}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <h2 className="font-bold text-lg mt-6">Webpage Description</h2>
                    <Textarea
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-2 h-[180px] text-sm"
                        placeholder="Write about your webpage 🚀"
                    />
                </div>
            </div>

            {/* Submit Button */}
            <div className="my-8 flex justify-center">
                <Button
                    disabled={loading}
                    onClick={UploadImage}
                    className="w-full md:w-1/2 text-lg h-[50px]"
                >
                    {loading ? <Loader2Icon className="animate-spin" /> : 'Convert to Code 🧑‍💻✨'}
                </Button>
            </div>
        </div>

    )
}

export default ImageUpload
