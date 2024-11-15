'use client'

import {Pagination} from "@nextui-org/react";
import {ITEMS_PER_PAGE} from "@/db/queries/newsletter";
import {usePathname, useSearchParams, useRouter} from "next/navigation";

interface PageListerTableProps {
    page?: string,
    totalItems: number,
}

interface fetchNewslettersProps {
    page?: string;
    subject?: string;
    author?: string;
    newsletter?: string;
    dateCreatedTo?: string;
    dateCreatedFrom?: string;
    dateEmailedTo?: string;
    dateEmailedFrom?: string;

}


export default function PageListerTable({page, totalItems}: PageListerTableProps) {
    const searchParams = useSearchParams()
    const pathname = usePathname();
    const router = useRouter();

    const subject = searchParams.get("subject")
    const author = searchParams.get("author")
    const newsletter = searchParams.get("newsletter")
    const dateCreatedTo = searchParams.get("dateCreatedTo")
    const dateCreatedFrom = searchParams.get("dateCreatedFrom")
    const dateEmailedTo = searchParams.get("dateEmailedTo")
    const dateEmailedFrom = searchParams.get("dateEmailedFrom")

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
        
        if (subject) {
            route_path += `&subject=${subject}`
        }
        if (author) {
            route_path += `&author=${author}`
        }
        if (newsletter) {
            route_path += `&newsletter=${newsletter}`
        }
        if (dateCreatedFrom && dateCreatedTo) {
            route_path += `&dateCreatedFrom=${dateCreatedFrom}&dateCreatedTo=${dateCreatedTo}`
        }
        if (dateEmailedFrom && dateEmailedTo) {
            route_path += `&dateEmailedFrom=${dateEmailedFrom}&dateEmailedTo=${dateEmailedTo}`
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

