import { format } from 'date-fns'

import prismadb from '@/lib/prismadb'
import { CategoryClient } from './_components/client'
import { CategoryColumn } from './_components/columns'

export default async function CategoriesPage({ params }: { params: { storeId: string } }) {
    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            billboard: true
            //when we create our category we want to select which billboard to use.
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedCategories: CategoryColumn[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label,
        createdAt: format(item.createdAt, "MMMM do, yyy")
    }))

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <CategoryClient data={formattedCategories} />
            </div>
        </div>
    )
}
