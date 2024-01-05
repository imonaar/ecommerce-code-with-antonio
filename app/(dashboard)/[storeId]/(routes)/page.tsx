import { Heading } from "@/components/heading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatter } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { CreditCard, DollarSign, Package } from "lucide-react"
import { getTotalRevenue } from "@/actions/get-total-revenue"
import { getSalesCount } from "@/actions/get-sales-count"
import { getStockCount } from "@/actions/get-stock-count"
import Overview from "@/components/overview"
import { getGraphRevenue } from "@/actions/get-graph-revenue"

interface DashboardProps {
    params: {
        storeId: string
    }
}

export default async function DashboardPage({ params }: DashboardProps) {
    const totalRevenue = await getTotalRevenue(params.storeId)
    const salesCount = await getSalesCount(params.storeId)
    const stockCount = await getStockCount(params.storeId)
    const graphData = await getGraphRevenue(params.storeId)

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 ">
                <Heading title="Dashboard" description="Overview of your store" />
                <Separator />
                <div className="grid gap-4 grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total revenue
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                                {formatter.format(totalRevenue)}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Sales
                            </CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                                +{salesCount}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Products in Stock
                            </CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                                {stockCount}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>
                            Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview data={graphData} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
