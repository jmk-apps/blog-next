'use client'

import {Pagination} from "@nextui-org/react";
import {ITEMS_PER_PAGE} from "@/db/queries/post";
import {usePathname, useRouter} from "next/navigation";

interface PageListerProps {
    page?: string,
    totalItems: number,
}


export default function PageLister({page, totalItems}: PageListerProps) {
    const pathname = usePathname();
    const router = useRouter();
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
        router.push(`${pathname}?page=${page}`)
        router.refresh()
    }

    return (
        <div className="flex items-center justify-center">
            <Pagination page={currentPage} total={totalPages} onChange={nextPage} />
        </div>
    )

}

