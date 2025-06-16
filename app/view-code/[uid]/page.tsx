'use client'
import constant from '@/constants/constant';
import axios from 'axios';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import SelectionDetails from './_components/SelectionDetails';
import Codeeditor from './_components/Codeeditor';
import { AppSidebar } from '@/app/_components/AppSidebar';
import AppHeader from '@/app/_components/AppHeader';
import { Appcontext } from '@/context/Appcontext';

export interface RECORD {
    id: number;
    description: string;
    code: any;
    imageUrl: string;
    model: string;
    createdBy: string;
    uid: string;
}

const ViewCode = () => {
    const { uid } = useParams();
    const [loading, setLoading] = useState(true);
    const [codeResp, setCodeResp] = useState('');
    const [record, setRecord] = useState<RECORD | null>(null);
    const [isReady, setIsReady] = useState(false);
    // const [regenerate, setRegenerate] = useState(false);
    const router = useRouter();
    const { model } = useContext(Appcontext);

    const GetRecordInfo = async (regenerate = false) => {
        setLoading(true);
        setIsReady(false);  // Reset isReady before fetching
        try {
            const result = await axios.get('/api/wireframe-to-code?uid=' + uid);
            const resp = result?.data;
            setRecord(resp[0]);

            if (resp[0]?.code === null || resp[0]?.code === '{}' || resp[0]?.code === undefined) {
                GenerateCode(resp[0]);
            } else if (regenerate) {
                GenerateCode(resp[0]);
            } else {
                setCodeResp(resp[0]?.code);
                setIsReady(true);  // Set isReady when code is available
            }

        } catch (error) {
            console.error('Error fetching record:', error);
        } finally {
            setLoading(false);  // Set loading to false after fetching is done
        }
    };

    const GenerateCode = async (resp: RECORD) => {
        setLoading(true);

        try {
            const res = await fetch('/api/ai-model', {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({
                    description: resp?.description + constant.PROMPT,
                    model: model,
                    imageUrl: resp?.imageUrl,
                }),
            });

            if (!res.body) return;
            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let text = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }
                text += (decoder.decode(value)).replace('```', '').replace('```', '').replace('jsx', '');
            }
            setCodeResp(text);
            setIsReady(true);  // Set isReady when code generation is complete

        } catch (error) {
            console.error('Error generating code:', error);
        } finally {
            setLoading(false);  // Set loading to false after code generation is done
        }
    };

    const UpdateCodetoDb = async () => {
        if (!record) return;

        try {
            await axios.put('/api/wireframe-to-code', {
                uid: record?.uid,
                codeResp: codeResp,
                model: model
            });
        } catch (error) {
            console.error('Error updating code in DB:', error);
        }
    };

    useEffect(() => {
        if (isReady) {
            UpdateCodetoDb();
        }
    }, [isReady, codeResp, record]);

    useEffect(() => {
        GetRecordInfo();
    }, [uid]);

    return (
        <div>
            <div className='flex w-full justify-between items-center'>
                <div className='px-5'>
                    <ArrowLeft className='cursor-pointer' onClick={() => router.back()} />

                </div>
                <AppHeader hideSidebar={true} />

            </div>

            {
                !isReady ? (<div className='md:mx-10 mx-2  h-[90vh] my-2'>
                    <div className="font-bold text-2xl text-center p-20 flex items-center justify-center h-full bg-slate-100 rounded-xl border">
                        <div>
                            <LoaderCircle className="animate-spin" />
                        </div>
                        <p>
                            Analyzing the wireframe
                        </p>
                    </div>
                </div>) : (<div className="flex flex-col justify-between md:flex-row gap-10   p-5">
                    <div className="col-span-1 md:w-1/6">
                        {/* selection details */}
                        <SelectionDetails isReady={isReady} record={record as RECORD} RegenrateCode={GetRecordInfo} loading={loading} />
                    </div>
                    <div className="col-span-4 md:w-5/6">
                        <Codeeditor codeResp={codeResp} isReady={isReady} />
                        {/* Code editor */}
                    </div>
                </div>)
            }

        </div>
    );
};

export default ViewCode;
