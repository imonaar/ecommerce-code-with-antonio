"use client"

import { useStoreModal } from "@/hooks/use-store-modal"
import { useEffect } from "react";

export default function SetUpPage() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])
  
  return (
    <main>
      root page
    </main>
  )
}
