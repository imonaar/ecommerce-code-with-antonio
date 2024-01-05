import prismadb from '@/lib/prismadb'

export async function getSalesCount(storeId: string) {
    const sales = await prismadb.order.count({
        where: {
            storeId,
            isPaid: true
        },
    }
    );

    return sales
}
