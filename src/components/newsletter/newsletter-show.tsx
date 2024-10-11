import {db} from "@/db";
import {notFound} from "next/navigation";
import {formatDate} from "@/lib/help-functions";
import {Button, Link} from "@nextui-org/react";
import paths from "@/paths";
import NewsletterDeleteButton from "@/components/newsletter/newsletter-delete-button";
import NewsletterEmailButton from "@/components/newsletter/newsletter-email-button";


interface NewsletterShowProps {
    newsletterId: string;
}


export default async function NewsletterShow({ newsletterId }: NewsletterShowProps) {

    const newsletter = await db.newsletter.findFirst({
        where: {id: newsletterId},
    })

    if (!newsletter) {
        notFound()
    }

    let date_emailed = "None"
    if (newsletter.dateEmailed){
       date_emailed = formatDate(newsletter.dateEmailed)
    }

    let date_updated = "None"
    if (newsletter.updatedAt) {
        date_updated = formatDate(newsletter.updatedAt)
    }


    return (
        <div className="flex flex-col gap-4 p-4 w-80">
            <h1 className="font-bold mb-4 text-2xl">Newsletter</h1>
            <h3 className="font-bold">Subject:</h3>
            <p className="text-sm">{newsletter.subject}</p>
            <h3 className="mt-2 font-bold">Message:</h3>
            <p className="text-sm">{newsletter.message}</p>
            <h3 className="mt-2 font-bold">Newsletter:</h3>
            <p className="text-sm">{newsletter.newsletterFile}</p>
            <h3 className="mt-2 font-bold">Date emailed:</h3>
            <p className="text-sm">{date_emailed}</p>
            <h3 className="mt-2 font-bold">Date updated:</h3>
            <p className="text-sm">{date_updated}</p>
            <Button
                href={paths.newsletterEdit(newsletter.id)}
                as={Link}
            >
                Edit
            </Button>

        {/*     Delete button */}
            <NewsletterDeleteButton newsletterId={newsletter.id}/>

        {/*    Email button*/}
            <NewsletterEmailButton newsletterId={newsletterId}/>


        </div>
    )

}
