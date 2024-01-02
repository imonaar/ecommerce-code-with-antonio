import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params }: {
        params: {
            storeId: string,
            sizeId: string
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

        if (!params.sizeId) {
            return new NextResponse("Size ID is Required", { status: 400 })
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

        const size = await prismadb.size.updateMany({
            where: {
                id: params.sizeId
            },
            data: {
                name,
                value,
            }
        });

        return NextResponse.json(size)
    } catch (e: any) {
        console.log('[SIZE_PATCH]', e)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: {
        params: {
            storeId: string,
            sizeId: string
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

        if (!params.sizeId) {
            return new NextResponse("Size ID is Required", { status: 400 })
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

        const size = await prismadb.size.deleteMany({
            where: {
                id: params.sizeId
            }
        });

        return NextResponse.json(size)
    } catch (e: any) {
        console.log('[SIZE_DELETE]', e)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: {
        params: {
            storeId: string,
            sizeId: string
        }
    }
) {
    try {

        if (!params.sizeId) {
            return new NextResponse("Size ID is Required", { status: 400 })
        }


        const size = await prismadb.size.findUnique({
            where: {
                id: params.sizeId
            },
        });

        return NextResponse.json(size)
    } catch (e: any) {
        console.log('[SIZE_GET]', e)
        return new NextResponse("Internal Error", { status: 500 })
    }
}