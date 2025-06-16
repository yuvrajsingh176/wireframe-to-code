import { RECORD } from "@/app/view-code/[uid]/page"
import { Button } from "@/components/ui/button"
import constant from "@/constants/constant"
import { CodeIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const DesignCard = ({ item }: { item: RECORD }) => {
    const modelObj = constant.AiModelList.find((listitem) => listitem.name === item.model);
    return (
        <div className="p-5 border rounded-lg">
            <Image src={item?.imageUrl} alt="design card image" height={300} width={200} className="h-[200px] w-[300px] object-cover rounded-lg bg-white" />
            <div className="">
                <h2 className="line-clamp-3 mt-4 mb-2 text-gray-400 text-sm ">{item?.description}</h2>
                <div className="flex justify-between items-center text-center ">
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-full w-fit mt-2">
                        <Image src={modelObj?.icon || ''} alt={modelObj?.modelName || ''} height={30} width={30} className="rounded-full" />
                        <h2>{modelObj?.name}</h2>
                    </div>
                    <Link href={'/view-code/' + item?.uid}>
                        <Button ><CodeIcon /> View Code</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default DesignCard
