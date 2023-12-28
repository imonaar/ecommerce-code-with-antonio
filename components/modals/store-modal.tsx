"use client"

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "../modal"

export const StoreModal = () => {
    const storeModal = useStoreModal()
    return (
        <Modal
            title="Create Store"
            description="Add a new Store to manage product and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            Future create Store form
        </Modal>
    )
}