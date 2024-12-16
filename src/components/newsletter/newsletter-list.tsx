import {Link, Button} from "@nextui-org/react";
import { fetchNewsletters, countNewsletters } from "@/db/queries/newsletter";
import NewsletterTable from "./newsletter-table";
import PageListerTable from "./page-lister-table";
import paths from "@/paths";


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
    const newsletterCount = await countNewsletters(subject, author, newsletter, dateCreatedFrom, dateCreatedTo, dateEmailedFrom, dateEmailedTo);

    return (
        <div>
            <Button
                showAnchorIcon
                as={Link}
                color="primary"
                href={paths.newsletterCreate()}
                variant="solid"
            >
                Create Newsletter
            </Button>
            <NewsletterTable newsletters={newsletters} />
            <PageListerTable page={page} totalItems={newsletterCount} />
        </div>
    )
}