import { format } from 'date-fns'

import prismadb from '@/lib/prismadb'
import { ProductClient } from './_components/product-client'
import { ProductColumn } from './_components/columns'
import { formatter } from '@/lib/utils'

export default async function ProductsPage({ params }: { params: { storeId: string } }) {
    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            category: true,
            size: true,
            color: true
        },
        //we are including this so tha we can access those individual models in an object and the display them
        orderBy: {
            createdAt: 'desc'
        }
    })


    const formattedProducts: ProductColumn[] = products.map((item) => ({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: formatter.format(item.price.toNumber()),
        category: item.category.name,
        size: item.size.name,
        color: item.color.value,
        createdAt: format(item.createdAt, "MMMM do, yyy")
    }))

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <ProductClient
                    data={formattedProducts}
                />
            </div>
        </div>
    )
}
