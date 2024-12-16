import UserAccountDetails from "@/components/User/user-account-details";
import { checkAdmin } from "@/lib/auth-functions";
import paths from "@/paths";
import { redirect } from "next/navigation";

interface UserAccountPageProps {
    params: {
        userId: string;
    }
}

export default async function AccountUserPage({params}: UserAccountPageProps) {

    if (!await checkAdmin()) {
        redirect(paths.home())
    }

    const {userId} = params;

    return (
        <UserAccountDetails userId={userId} />
    )
}


