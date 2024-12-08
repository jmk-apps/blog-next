import UserAccountDetails from "@/components/User/user-account-details";

interface UserAccountPageProps {
    params: {
        userId: string;
    }
}

export default function AccountUserPage({params}: UserAccountPageProps) {
    const {userId} = params;

    return (
        <UserAccountDetails userId={userId} />
    )
}


