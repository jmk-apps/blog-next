import {redirect} from "next/navigation";
import PostList from "@/components/posts/post-list";
import {fetchPostsBySearchCategory, fetchPostsBySearchDate, fetchPostsBySearchTerm} from "@/db/queries/post";
import PageLister from "@/components/common/page-lister";
import {countPostsBySearchCategory, countPostsBySearchDate, countPostsBySearchTerm} from "@/db/queries/pageCounts";

interface SearchPageProps {
    searchParams: {
        term?: string;
        category?: string;
        date?: string;
        page?: string;
    }
}

export default async function SearchPage({searchParams}: SearchPageProps) {
    const {term, category, date, page} = searchParams;

    let totalPosts: number;
    let postListFunc: any;

    if (term) {
       totalPosts = await countPostsBySearchTerm(term);
       postListFunc = fetchPostsBySearchTerm(term, page)
    }
    else if (category) {
        totalPosts = await countPostsBySearchCategory(category);
        postListFunc = fetchPostsBySearchCategory(category, page)
    }
    else if (date) {
        totalPosts = await countPostsBySearchDate(date);
        postListFunc = fetchPostsBySearchDate(date, page)
    }
    else {
       redirect('/')
    }



    return (
        <>
            <div className="grid grid-cols-4 gap-4 p-4">
                <div className="col-span-3">
                    <h1>Posts go here</h1>
                    <PostList fetchData={() => postListFunc} />
                </div>
                <div className="col-span-1">
                    <h1>Notifications go here</h1>
                </div>
            </div>
            <PageLister page={searchParams?.page} totalItems={totalPosts}/>
        </>

    )
}

