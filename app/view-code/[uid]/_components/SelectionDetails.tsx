import Image from "next/image"
import { RECORD } from "../page"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import constant from "@/constants/constant"
import { Dispatch, SetStateAction, useContext, useEffect } from "react"
import { Appcontext } from "@/context/Appcontext";

const SelectionDetails = ({ record, RegenrateCode, isReady, loading, }: { record: RECORD, RegenrateCode: () => Promise<void>, isReady: boolean, loading: boolean, }) => {

    const { model, setModel } = useContext(Appcontext);



    return record && (
        <div className="p-5 bg-gray-100 h-[80vh] rounded-lg" >
            <h2 className="font-bold my-2 text-xl">Wireframe</h2>
            <Image src={record?.imageUrl} alt="wireframe" width={300} height={200} className="rounded-lg object-contain h-[200px] w-full border border-dashed p-2 bg-white" />
            <h2 className="mt-4 font-bold mb-2">AI Model</h2>
            <Select disabled={loading} value={model} onValueChange={(value) => {
                setModel(value)
            }}>
                <SelectTrigger className="w-full h-10 bg-white">
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
            <h2 className="mt-4 font-bold mb-2">Description</h2>

            <Textarea defaultValue={record?.description} disabled={loading} className="bg-white h-[180px]" />
            <div className="mt-4 flex justify-center items-center">
                <Button disabled={loading} onClick={() => RegenrateCode(true)}><RefreshCcw /> Regenerate Code</Button>
            </div>
        </div>
    )
}

export default SelectionDetails