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

        const {
            name,
            price,
            colorId,
            sizeId,
            categoryId,
            images,
            isArchived,
            isFeatured
        } = await req.json()

        if (!name) {
            return new NextResponse("Name is Required", { status: 400 })
        }
        if (!price) {
            return new NextResponse("price is Required", { status: 400 })
        }
        if (!sizeId) {
            return new NextResponse("sizeId is Required", { status: 400 })
        }
        if (!images || !images.length) {
            return new NextResponse("Image are Required", { status: 400 })
        }
        if (!colorId) {
            return new NextResponse("colorId is Required", { status: 400 })
        }
        if (!categoryId) {
            return new NextResponse("categoryId is Required", { status: 400 })
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

        const product = await prismadb.product.create({
            data: {
                name,
                price,
                isFeatured,
                isArchived,
                colorId,
                sizeId,
                categoryId,
                storeId: params.storeId,
                images: {
                    createMany: {
                        data: [...images.map((image: { url: string }) => image)]
                    }
                }
            }
        });
        return NextResponse.json(product)
    } catch (e: any) {
        console.log('[PRODUCTS_POST]', e)
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
        const { searchParams } = new URL(req.url)
        const categoryId = searchParams.get('categoryId') || undefined
        const sizeId = searchParams.get('sizeId') || undefined
        const colorId = searchParams.get('colorId') || undefined
        const isFeatured = searchParams.get('isFeatured')

        if (!params.storeId) {
            return new NextResponse("Store ID is Required", { status: 400 })
        }

        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                colorId,
                sizeId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false
            },
            include: {
                images: true,
                category: true,
                size: true,
                color: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json(products)
    } catch (e: any) {
        console.log('[PRODUCTS_GET]', e)
        return new NextResponse("Internal Error", { status: 500 })
    }
}