'use client'

import { ITEMS_PER_PAGE } from "@/db/queries/subscriber";
import {Pagination} from "@nextui-org/react";

import {usePathname, useSearchParams, useRouter} from "next/navigation";

interface PageSubscriberTableProps {
    page?: string,
    totalItems: number,
}

interface SubscriberListProps {
    page?: string;
    email?: string;
    dateCreatedFrom?: string;
    dateCreatedTo?: string;
}


export default function PageSubscriberTable({page, totalItems}: PageSubscriberTableProps) {
    const searchParams = useSearchParams()
    const pathname = usePathname();
    const router = useRouter();

    const email = searchParams.get("email")
    const dateCreatedTo = searchParams.get("dateCreatedTo")
    const dateCreatedFrom = searchParams.get("dateCreatedFrom")
    

    if (!page) {
        page = "1"
    }
    const currentPage = parseInt(page)
    let totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

    // If there are no items i.e. totalItems = 0
    if (totalPages === 0) {
        totalPages = 1
    }

    

    const nextPage = (page: number) => {

        let route_path = `${pathname}?page=${page}`
        
        if (email) {
            route_path += `&email=${email}`
        }
    
        if (dateCreatedFrom && dateCreatedTo) {
            route_path += `&dateCreatedFrom=${dateCreatedFrom}&dateCreatedTo=${dateCreatedTo}`
        }
        

        router.push(route_path)
        router.refresh()
    }

    return (
        <div className="flex items-center justify-center">
            <Pagination page={currentPage} total={totalPages} onChange={nextPage} />
        </div>
    )

}

