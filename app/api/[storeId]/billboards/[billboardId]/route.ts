import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params }: {
        params: {
            storeId: string,
            billboardId: string
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

        const { label, imageUrl } = await req.json()

        if (!label) {
            return new NextResponse("Label is Required", { status: 400 })
        }

        if (!imageUrl) {
            return new NextResponse("Image is Required", { status: 400 })
        }

        if (!params.billboardId) {
            return new NextResponse("Billboard ID is Required", { status: 400 })
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

        const billboard = await prismadb.billboard.updateMany({
            where: {
                id: params.billboardId
            },
            data: {
                label: label,
                imageUrl: imageUrl,
            }
        });

        return NextResponse.json(billboard)
    } catch (e: any) {
        console.log('[BILLBOARD_PATCH]', e)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: {
        params: {
            storeId: string,
            billboardId: string
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

        if (!params.billboardId) {
            return new NextResponse("Billboard ID is Required", { status: 400 })
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

        const billboard = await prismadb.billboard.deleteMany({
            where: {
                id: params.billboardId
            }
        });

        return NextResponse.json(billboard)
    } catch (e: any) {
        console.log('[BILLBOARD_DELETE]', e)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: {
        params: {
            storeId: string,
            billboardId: string
        }
    }
) {
    try {

        if (!params.billboardId) {
            return new NextResponse("Billboard ID is Required", { status: 400 })
        }


        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: params.billboardId
            },
        });

        return NextResponse.json(billboard)
    } catch (e: any) {
        console.log('[BILLBOARD_GET]', e)
        return new NextResponse("Internal Error", { status: 500 })
    }
}