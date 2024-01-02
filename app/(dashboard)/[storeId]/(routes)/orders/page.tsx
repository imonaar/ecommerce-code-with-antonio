import { format } from 'date-fns'

import prismadb from '@/lib/prismadb'
import { OrderClient } from './_components/order-client'
import { OrderColumn } from './_components/columns'
import { formatter } from '@/lib/utils'

export default async function OrdersPage({ params }: { params: { storeId: string } }) {
    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedOrders: OrderColumn[] = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        address: item.address,
        products: item.orderItems.map(orderItem => orderItem.product.name).join(", "),
        totalPrice: formatter.format(item.orderItems.reduce((total, it) => {
            return total + Number(it.product.price)
        }, 0)),
        isPaid: item.isPaid,
        createdAt: format(item.createdAt, "MMMM do, yyy")
    }))

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <OrderClient data={formattedOrders} />
            </div>
        </div>
    )
}
