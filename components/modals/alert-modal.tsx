"use client"

import { useEffect, useState } from "react";
import { Modal } from "../modal";
import { Button } from "../ui/button";

interface AlertModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onClose: () => void;
    loading: boolean
}

export default function AlertModal({ isOpen, loading, onConfirm, onClose }: AlertModalProps) {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => setIsMounted(true), [])

    if (!isMounted) {
        return null
    }
    return (
        <Modal
            title="Are you sure"
            description="This action cannot be undone"
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                    disabled={loading}
                    variant="outline"
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    disabled={loading}
                    variant="destructive"
                    onClick={onConfirm}
                >
                    Continue
                </Button>
            </div>
        </Modal>
    )
}
