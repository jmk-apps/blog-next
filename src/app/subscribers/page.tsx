import SubscriberList from "@/components/subscriber/subscriber-list";
import { checkAdmin } from "@/lib/auth-functions";
import paths from "@/paths";
import { redirect } from "next/navigation";

interface SearchParamProps {
    searchParams?: {
        page?: string;
        email?: string;
        dateCreatedTo?: string;
        dateCreatedFrom?: string;
    }   
}


export default async function SubscribersPage({searchParams}: SearchParamProps) {

    if ( !await checkAdmin()) {
        redirect(paths.home())
    }
        
        return (
            <div>
                <h1>Subscribers List</h1>
                <SubscriberList
                    page={searchParams?.page}
                    email={searchParams?.email}
                    dateCreatedFrom={searchParams?.dateCreatedFrom}
                    dateCreatedTo={searchParams?.dateCreatedTo }  
                />
            </div>
        )
}


