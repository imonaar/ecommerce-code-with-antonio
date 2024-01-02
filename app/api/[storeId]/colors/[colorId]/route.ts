import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params }: {
        params: {
            storeId: string,
            colorId: string
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

        const { name, value } = await req.json()

        if (!name) {
            return new NextResponse("Name is Required", { status: 400 })
        }

        if (!value) {
            return new NextResponse("Value is Required", { status: 400 })
        }

        if (!params.colorId) {
            return new NextResponse("Color ID is Required", { status: 400 })
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

        const color = await prismadb.color.updateMany({
            where: {
                id: params.colorId
            },
            data: {
                name,
                value,
            }
        });

        return NextResponse.json(color)
    } catch (e: any) {
        console.log('[COLOR_PATCH]', e)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: {
        params: {
            storeId: string,
            colorId: string
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

        if (!params.colorId) {
            return new NextResponse("Color ID is Required", { status: 400 })
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

        const color = await prismadb.color.deleteMany({
            where: {
                id: params.colorId
            }
        });

        return NextResponse.json(color)
    } catch (e: any) {
        console.log('[COLOR_DELETE]', e)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: {
        params: {
            storeId: string,
            colorId: string
        }
    }
) {
    try {

        if (!params.colorId) {
            return new NextResponse("Color ID is Required", { status: 400 })
        }


        const color = await prismadb.color.findUnique({
            where: {
                id: params.colorId
            },
        });

        return NextResponse.json(color)
    } catch (e: any) {
        console.log('[COLOR_GET]', e)
        return new NextResponse("Internal Error", { status: 500 })
    }
}