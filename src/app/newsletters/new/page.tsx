import NewsletterCreateForm from "@/components/newsletter/newsletter-create-form";
import { checkAdmin, checkBlogger } from "@/lib/auth-functions";
import paths from "@/paths";
import { redirect } from "next/navigation";


export default async function NewsletterCreatePage() {

    if ((!await checkAdmin()) || (!await checkBlogger())) {
        redirect(paths.home())
    }

    return (
        <NewsletterCreateForm />
    )
}