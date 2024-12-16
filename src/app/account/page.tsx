import AccountDetails from "@/components/account/account-details";
import { checkAdmin, checkBlogger, checkUser } from "@/lib/auth-functions";
import paths from "@/paths";
import { redirect } from "next/navigation";

export default async function AccountPage() {

    if ((!await checkAdmin()) || (!await checkBlogger()) || (!await checkUser())) {
        redirect(paths.home())
    }

    return (
        <AccountDetails/>
    )
}