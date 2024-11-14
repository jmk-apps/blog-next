import NewsletterList from "@/components/newsletter/newsletter-list";

interface SearchParamProps {
    searchParams?: {
        page?: string;
        subject?: string;
        author?: string;
        newsletter?: string;
        dateCreatedTo?: string;
        dateCreatedFrom?: string;
        dateEmailedTo?: string;
        dateEmailedFrom?: string;
    }   
}

export default function NewslettersPage({searchParams}: SearchParamProps) {
    

    return (
        <NewsletterList 
            page={searchParams?.page} 
            subject={searchParams?.subject} 
            author={searchParams?.author} 
            newsletter={searchParams?.newsletter}
            dateCreatedFrom={searchParams?.dateCreatedFrom}
            dateCreatedTo={searchParams?.dateCreatedTo}
            dateEmailedFrom={searchParams?.dateEmailedFrom}
            dateEmailedTo={searchParams?.dateEmailedTo}
        />
    )
}

