"use client"

import UseOrigin from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import ApiAlert from "./api-alert";

interface ApiListProps {
    entityName: string;
    entityIdName: string
}

export default function ApiList({ entityIdName, entityName }: ApiListProps) {
    const params = useParams()
    const origin = UseOrigin()
    const baseUrl = `${origin}/api/${params.storeId}`

    return (
        <>
            <ApiAlert
                title='GET'
                variant="public"
                description={`${baseUrl}/${entityName}`}
            />
            <ApiAlert
                title='GET'
                variant="public"
                description={`${baseUrl}/${entityName}/{${entityIdName}}`}
            />
            <ApiAlert
                title='POST'
                variant="admin"
                description={`${baseUrl}/${entityName}`}
            />
            <ApiAlert
                title='PATCH'
                variant="admin"
                description={`${baseUrl}/${entityName}/{${entityIdName}}`}
            />
            <ApiAlert
                title='DELETE'
                variant="admin"
                description={`${baseUrl}/${entityName}/{${entityIdName}}`}
            />
        </>
    )
}
