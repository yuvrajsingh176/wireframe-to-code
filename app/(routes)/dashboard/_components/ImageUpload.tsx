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
        <div className="mt-10">
            <div className="flex gap-10 w-full">
                <div className="p-7 border border-dashed rounded-md shadow-md flex flex-col justify-center items-center w-1/2">
                    {fileurl.length === 0 ? (<div className="flex flex-col justify-center items-center">
                        <CloudUploadIcon className="size-10" />
                        <h2 className="font-bold text-lg">Upload Image</h2>
                        <p className="text-gray-300 mt-3 mb-4">Select Wireframe Image</p>
                        <div className="p-5 border  border-dashed w-full flex items-center justify-center">
                            <label htmlFor="fileUpload">
                                <h2 className="px-4 py-3 border bg-primary rounded-md text-white">Select Image</h2>
                            </label>
                        </div>
                        <input onChange={onImageSelect} type="file" id="fileUpload" className="hidden" />
                    </div>) :
                        (<div className="mt-4">
                            <Image src={fileurl} alt="Uploaded image" height={300} width={300} className="border-2 rounded-md " />
                            <div className="flex w-full justify-center items-center mt-4 text-red-800">
                                <X onClick={() => {
                                    setFile(null);
                                    setFileUrl('');
                                }} className={`${loading && 'hidden'} size-10 cursor-pointer  `} />
                            </div>
                        </div>)}
                </div>
                <div className="p-7 border  rounded-md shadow-md flex flex-col justify-center items-start w-1/2">
                    <h2 className="font-bold text-lg text-start mb-3">Select AI Model</h2>
                    <Select onValueChange={(value) => {
                        setModel(value)
                    }}>
                        <SelectTrigger className="w-full h-10">
                            <SelectValue placeholder="Select AI Model" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Models</SelectLabel>
                                {
                                    constant.AiModelList.map((model) => (
                                        <SelectItem key={model.name} value={model.name} >
                                            <div className="flex gap-2 items-center text-start">
                                                <Image src={model.icon} height={25} width={25} alt="icon" />
                                                <p>
                                                    {model.name}
                                                </p>
                                            </div>
                                        </SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <h1 className="font-bold text-lg mt-7">Enter Description about your web page</h1>
                    <Textarea onChange={(e) => setDescription(e.target.value)} className="mt-3 h-[200px]" placeholder="Write about your webpage🚀" />
                </div>

            </div>
            <div className="my-4 flex justify-center items-center ">
                <Button disabled={loading} onClick={UploadImage} className="w-1/2 text-lg h-[50px]"> {loading ? <Loader2Icon className="animate-spin" /> : 'Convert to Code🧑‍💻✨'} </Button>
            </div>
        </div>
    )
}

export default ImageUpload
