'use client'

import { ITEMS_PER_PAGE } from "@/db/queries/user";
import {Pagination} from "@nextui-org/react";

import {usePathname, useSearchParams, useRouter} from "next/navigation";

interface PageUserTableProps {
    page?: string,
    totalItems: number,
}

interface UserListProps {
    page?: string;
    name?: string;
    email?: string;
    roleAdmin?: string;
    roleBlogger?: string;
    roleUser?: string;
    dateCreatedTo?: string;
    dateCreatedFrom?: string;
}


export default function PageUserTable({page, totalItems}: PageUserTableProps) {
    const searchParams = useSearchParams()
    const pathname = usePathname();
    const router = useRouter();

    const name = searchParams.get("name")
    const email = searchParams.get("email")
    const roleAdmin = searchParams.get("roleAdmin")
    const roleBlogger = searchParams.get("roleBlogger")
    const roleUser = searchParams.get("roleUser")
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
        

        if (name) {
            route_path += `&name=${name}`
        }
        if (email) {
            route_path += `&email=${email}`
        }
        if (roleAdmin === 'true') {
            route_path += `&roleAdmin=${roleAdmin}`
        }
        if (roleBlogger === 'true') {
            route_path += `&roleBlogger=${roleBlogger}`
        }
        if (roleUser === 'true') {
            route_path += `&roleUser=${roleUser}`
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

