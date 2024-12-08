import SubscriberList from "@/components/subscriber/subscriber-list";

interface SearchParamProps {
    searchParams?: {
        page?: string;
        email?: string;
        dateCreatedTo?: string;
        dateCreatedFrom?: string;
    }   
}


export default function SubscribersPage({searchParams}: SearchParamProps) {
        
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


