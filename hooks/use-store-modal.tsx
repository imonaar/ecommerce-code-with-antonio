import { create } from 'zustand'

interface IuseStoreModal {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void
}

export const useStoreModal = create<IuseStoreModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))