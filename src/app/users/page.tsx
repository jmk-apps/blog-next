import UserList from "@/components/User/user-list";
import { checkAdmin } from "@/lib/auth-functions";
import paths from "@/paths";
import {redirect} from "next/navigation";
import {toast} from 'react-toastify';



interface SearchParamProps {
    searchParams?: {
        page?: string;
        name?: string;
        email?: string;
        roleAdmin?: string;
        roleBlogger?: string;
        roleUser?: string;
        dateCreatedTo?: string;
        dateCreatedFrom?: string;
    }   
}

export  default async function UsersPage({searchParams}: SearchParamProps) {

    if ( !await checkAdmin()) {
        redirect(paths.home())
    }

    
    return (
        <UserList
            page={searchParams?.page}
            name={searchParams?.name}
            email={searchParams?.email}
            roleAdmin={searchParams?.roleAdmin}
            roleBlogger={searchParams?.roleBlogger}
            roleUser={searchParams?.roleUser}
            dateCreatedTo={searchParams?.dateCreatedTo}
            dateCreatedFrom={searchParams?.dateCreatedFrom}
        />
    )
}
