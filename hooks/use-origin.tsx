"use client"

import { useEffect, useState } from "react"

export default function UseOrigin() {
    const [mounted, setMounted] = useState(false)
    const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : ""

    useEffect(() => setMounted(true), [])

    if (!mounted) {
        return "";
    }
    return origin
}
