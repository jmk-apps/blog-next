import Image from "next/image";
import {auth} from "@/auth";


export default async function AccountDetails() {
    const session = await auth()

    return (
        <div>
            <div>
                <Image
                    src={session?.user?.image || '/default_profile_pic.jpg'}
                    width={200}
                    height={200}
                    alt="Picture of the author"
                />
                <p className="font-bold">{session?.user?.name}</p>
                <p>{session?.user?.email}</p>
            </div>
            <h1 className="font-bold my-3">Account Details</h1>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>
            <p>Username: {session?.user?.name}</p>
            <p>Email: {session?.user?.email}</p>
            <p>Role: {session?.user?.role}</p>
        </div>
    )
}

