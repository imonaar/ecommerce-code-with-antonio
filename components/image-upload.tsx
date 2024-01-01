"use client"

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from 'next-cloudinary';



interface ImageUploadProps {
    disabled?: boolean;
    onChange?: (value: string) => void;
    onRemove?: (value: string) => void;
    value: string[]
}

export default function ImageUpload({ disabled, value, onChange, onRemove }: ImageUploadProps) {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    const onUpload = (result: any) => {
        onChange(result.info.secure_url)
    }

    if (!mounted) {
        return null
    }
    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {
                    value.map((url) => (
                        <div key={url} className="relative w-[200px] h-[200px] square rounded-md overflow-hidden">
                            <div className="absolute top-2 right-2 z-10">
                                <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="icon">
                                    <Trash className='h-4 w-4' />
                                </Button>
                            </div>
                            <Image
                                src={url}
                                fill
                                className="object-cover"
                                alt="image"
                            />
                        </div>
                    ))
                }
            </div>
            <CldUploadWidget onUpload={onUpload} uploadPreset="bn7ltf27">
                {({ open }) => {
                    const onClick = () => open();
                    return (
                        <Button type="button" disabled={disabled} variant="secondary" onClick={onClick}>
                            <ImagePlus className="h-4 w-4 mr-2" />
                            Upload an Image
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    )
}
