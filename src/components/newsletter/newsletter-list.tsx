import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import { fetchNewsletters } from "@/db/queries/newsletter";
import { formatDate } from "@/lib/help-functions";
import { format } from "path";
import NewsletterActionsButton from "./newsletter-actions-button";
import NewsletterTable from "./newsletter-table";


interface NewsletterListProps {
    page?: string;
    subject?: string;
    author?: string;
    newsletter?: string;
    dateCreatedTo?: string;
    dateCreatedFrom?: string;
    dateEmailedTo?: string;
    dateEmailedFrom?: string;

}

export default async function NewsletterList({page, subject, author, newsletter, dateCreatedFrom , dateCreatedTo, dateEmailedFrom, dateEmailedTo}: NewsletterListProps) {
    
    const newsletters = await fetchNewsletters(page, subject, author, newsletter, dateCreatedFrom, dateCreatedTo, dateEmailedFrom, dateEmailedTo);

    return (
        <NewsletterTable newsletters={newsletters} />
    )
}