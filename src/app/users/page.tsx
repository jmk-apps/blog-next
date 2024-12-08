import UserList from "@/components/User/user-list";



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

export default function UsersPage({searchParams}: SearchParamProps) {
    
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
