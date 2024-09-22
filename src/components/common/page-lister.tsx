'use client'

import {Pagination} from "@nextui-org/react";
import {ITEMS_PER_PAGE} from "@/db/queries/post";
import {usePathname, useSearchParams, useRouter} from "next/navigation";

interface PageListerProps {
    page?: string,
    totalItems: number,
}


export default function PageLister({page, totalItems}: PageListerProps) {
    const searchParams = useSearchParams()
    const pathname = usePathname();
    const router = useRouter();

    const term = searchParams.get("term")
    const category = searchParams.get("category")
    const date = searchParams.get("date")

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
        if (term) {
            router.push(`${pathname}?term=${term}&page=${page}`)
        } else if (category) {
            router.push(`${pathname}?category=${category}&page=${page}`)
        } else if (date) {
            router.push(`${pathname}?date=${date}&page=${page}`)
        } else {
          router.push(`${pathname}?page=${page}`)
        }
        router.refresh()
    }

    return (
        <div className="flex items-center justify-center">
            <Pagination page={currentPage} total={totalPages} onChange={nextPage} />
        </div>
    )

}

