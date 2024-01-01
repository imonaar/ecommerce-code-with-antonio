import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    { params }: {
        params: {
            storeId: string
        }
    }
) {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("Unauthenticated", {
                status: 401
            })
        }

        const { name, billboardId } = await req.json()

        if (!name) {
            return new NextResponse("Name is Required", { status: 400 })
        }

        if (!billboardId) {
            return new NextResponse("Billboard is Required", { status: 400 })
        }

        if (!params.storeId) {
            return new NextResponse("Store ID is Required", { status: 400 })
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        const category = await prismadb.category.create({
            data: {
                name,
                billboardId,
                storeId: params.storeId
            }
        });

        return NextResponse.json(category)
    } catch (e: any) {
        console.log('[CATEGORIES_POST]', e)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: {
        params: {
            storeId: string
        }
    }
) {
    try {
        if (!params.storeId) {
            return new NextResponse("Store ID is Required", { status: 400 })
        }

        const categories = await prismadb.category.findMany({
            where: {
                storeId: params.storeId
            }
        });
        return NextResponse.json(categories)
    } catch (e: any) {
        console.log('[categories_GET]', e)
        return new NextResponse("Internal Error", { status: 500 })
    }
}