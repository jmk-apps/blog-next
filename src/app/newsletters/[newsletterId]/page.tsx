import NewsletterShow from "@/components/newsletter/newsletter-show";
import { checkAdmin, checkBlogger } from "@/lib/auth-functions";
import paths from "@/paths";
import { redirect } from "next/navigation";


interface NewsletterShowPageProps {
    params: {
        newsletterId: string;
    }
}


export default async function NewsletterShowPage({params}: NewsletterShowPageProps) {

    if ((!await checkAdmin()) || (!await checkBlogger())) {
        redirect(paths.home())
    }

    const {newsletterId} = params;

    return (
        <div className="space-y-3">
            <NewsletterShow newsletterId={newsletterId} />
        </div>
    )

}

