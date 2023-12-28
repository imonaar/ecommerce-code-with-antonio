"use client"

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

interface ModalProps {
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode

}

export const Modal: React.FC<ModalProps> = ({ title, description, isOpen, onClose, children }) => {
    const [isMounted, setIsMounted] = useState(false)
    const onChange = (open: boolean) => {
        if (!open) {
            onClose()
        }
    }

    useEffect(() => { setIsMounted(true) }, [])

    if (!isMounted) {
        return null
    }

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}