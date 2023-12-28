import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("Unauthorized", {
                status: 401
            })
        }

        const { name } = await req.json()

        if (!name) {
            return new NextResponse("Name is Required", { status: 400 })
        }

        const store = await prismadb.store.create({
            data: {
                name,
                userId
            }
        });

        return NextResponse.json(store)
    } catch (e: any) {
        console.log('[STORES_POST]', e)
        return new NextResponse("Internal Error", { status: 500 })
    }
}