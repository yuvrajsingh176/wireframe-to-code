'use client'
import axios from "axios";
import Provider, { useAuthContext } from "../provider"
import { useEffect, useState } from "react";
import DesignCard from "./_components/DesignCard";
import { RECORD } from "../view-code/[uid]/page";
import AppHeader from "../_components/AppHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Circle, Loader2Icon } from "lucide-react";

const page = () => {
    const { user } = useAuthContext();
    const [wireframeList, setWireframeList] = useState<RECORD[]>([]);
    const [loading, setLoading] = useState(true);

    const GetuserALLwireframes = async () => {
        setLoading(true);
        try {
            const result = await axios.get('/api/wireframe-to-code?email=' + user?.email);
            setWireframeList(result.data);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e)
        }

    }

    useEffect(() => {
        user && GetuserALLwireframes()
    }, [user]);


    return (
        <Provider>
            <h2 className="font-bold text-3xl text-center">Wireframe and Codes</h2>

            {loading ? (
                <div className="flex justify-center items-center h-[70vh]">
                    <Loader2Icon className="animate-spin size-20" />
                </div>
            ) : wireframeList?.length === 0 ? (
                <div className="text-center text-xl text-gray-500 mt-6">No Wireframes generated yet.</div>
            ) : (
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                    {wireframeList.map((list: RECORD) => (
                        <DesignCard key={list.id} item={list} />
                    ))}
                </div>
            )}

        </Provider>
    )
}

export default page; 