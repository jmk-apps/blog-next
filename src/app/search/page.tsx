import {redirect} from "next/navigation";
import PostList from "@/components/posts/post-list";
import {fetchPostsBySearchTerm} from "@/db/queries/post";
import PageLister from "@/components/common/page-lister";
import {countPostsBySearchTerm} from "@/db/queries/pageCounts";

interface SearchPageProps {
    searchParams: {
        term: string;
        page?: string;
    }
}

export default async function SearchPage({searchParams}: SearchPageProps) {
    const {term, page} = searchParams;
    const totalPosts = await countPostsBySearchTerm(term);

    if (!term) {
        redirect('/')
    }


    return (
        <>
            <div className="grid grid-cols-4 gap-4 p-4">
                <div className="col-span-3">
                    <h1>Posts go here</h1>
                    <PostList fetchData={() => fetchPostsBySearchTerm(term, page)} />
                </div>
                <div className="col-span-1">
                    <h1>Notifications go here</h1>
                </div>
            </div>
            <PageLister page={searchParams?.page} totalItems={totalPosts}/>
        </>

    )
}

