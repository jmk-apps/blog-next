import { fetchUserCount, fetchUsers } from "@/db/queries/user";
import UserTable from "./user-table";
import PageUserTable from "./page-user-table";


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

export default async function UserList({page, name, email, roleAdmin, roleBlogger, roleUser, dateCreatedFrom , dateCreatedTo}: UserListProps) {
    
    const users = await fetchUsers(page, name, email, roleAdmin, roleBlogger, roleUser, dateCreatedFrom, dateCreatedTo);
    const userCount = await fetchUserCount(name, email, roleAdmin, roleBlogger, roleUser, dateCreatedFrom, dateCreatedTo);

    return (
        <div>
            <UserTable users={users} />
            <PageUserTable page={page} totalItems={userCount} />
        </div>
    )

}

