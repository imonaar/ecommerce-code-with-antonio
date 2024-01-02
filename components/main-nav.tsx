"use client"

import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import Link from "next/link";


const MainNav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const pathname = usePathname()
    const params = useParams()

    const routes = [
        {
            label: 'Overview',
            href: `/${params.storeId}`,
            active: pathname === `/${params.storeId}`
        },
        
        {
            label: 'Billboards',
            href: `/${params.storeId}/billboards`,
            active: pathname === `/${params.storeId}/billboards`
        },
        {
            label: 'Products',
            href: `/${params.storeId}/products`,
            active: pathname === `/${params.storeId}/products`
        },
        {
            label: 'Categories',
            href: `/${params.storeId}/categories`,
            active: pathname === `/${params.storeId}/categories`
        },
        {
            label: 'Sizes',
            href: `/${params.storeId}/sizes`,
            active: pathname === `/${params.storeId}/sizes`
        },
        {
            label: 'Colors',
            href: `/${params.storeId}/colors`,
            active: pathname === `/${params.storeId}/colors`
        },
        {
            label: 'Orders',
            href: `/${params.storeId}/orders`,
            active: pathname === `/${params.storeId}/orders`
        },
        {
            label: 'Settings',
            href: `/${params.storeId}/settings`,
            active: pathname === `/${params.storeId}/settings`
        },
    ]

    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
            {
                routes.map(route => (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn("text-sm font-medium transition-colors hover:text-primary", route.active ? 'text-black dark:text-white':'text-muted-foreground' )}
                    >
                        {route.label}
                    </Link>
                ))
            }
        </nav>
    );
}

export default MainNav;