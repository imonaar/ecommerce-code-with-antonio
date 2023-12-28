import prismadb from "@/lib/prismadb"

interface DashboardProps {
    params: {
        storeId: string
    }
}

export default async function DashboardPage({ params }: DashboardProps) {
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId
        }
    })
    return (
        <div>
            This is a Dashboard Page
            Store  {JSON.stringify(store)}
        </div>
    )
}
