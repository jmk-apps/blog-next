import Image from "next/image";
import {db} from "@/db";
import UserDeleteButtonAccount from "./user-delete-button-account";


interface UserAccountDetailsProps {
    userId: string;
}

export default async function UserAccountDetails({userId}: UserAccountDetailsProps) {
    const user = await db.user.findUnique({
        where: {
            id: userId,
        },
    })

    if (!user) {
        return <p>User not found</p>
    }

    return (
        <div>
            <div>
                <Image
                    src={user.image || '/default_profile_pic.jpg'}
                    width={200}
                    height={200}
                    alt="Picture of the author"
                />
                <p className="font-bold">{user.name}</p>
                <p>{user.email}</p>
            </div>
            <h1 className="font-bold my-3">Account Details</h1>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>
            <p>Username: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <UserDeleteButtonAccount userId={userId}/>
        </div>
    )

}


