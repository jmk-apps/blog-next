import NewsletterShow from "@/components/newsletter/newsletter-show";


interface NewsletterShowPageProps {
    params: {
        newsletterId: string;
    }
}


export default function NewsletterShowPage({params}: NewsletterShowPageProps) {
    const {newsletterId} = params;

    return (
        <div className="space-y-3">
            <NewsletterShow newsletterId={newsletterId} />
        </div>
    )

}

