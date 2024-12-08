import { countSubscribers, fetchSubscribers } from "@/db/queries/subscriber";
import SubscriberTable from "./subscriber-table";


interface SubscriberListProps {
    page?: string;
    email?: string;
    dateCreatedFrom?: string;
    dateCreatedTo?: string;
}

export default async function SubscriberList({page, email, dateCreatedFrom, dateCreatedTo}: SubscriberListProps) {
    
    const subscribers = await fetchSubscribers(page, email, dateCreatedFrom, dateCreatedTo);
    const subscriberCount = await countSubscribers(email, dateCreatedFrom, dateCreatedTo);
    

    return (
        <div>
            <SubscriberTable subscribers={subscribers} />
        </div>
    )
}