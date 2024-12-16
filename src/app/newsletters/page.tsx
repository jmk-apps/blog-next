import NewsletterList from "@/components/newsletter/newsletter-list";
import { checkAdmin, checkBlogger } from "@/lib/auth-functions";
import paths from "@/paths";
import { redirect } from "next/navigation";

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

export default async function NewslettersPage({searchParams}: SearchParamProps) {
    
    if ((!await checkAdmin()) || (!await checkBlogger())) {
        redirect(paths.home())
    }

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

