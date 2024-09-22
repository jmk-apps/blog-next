import PostList from "@/components/posts/post-list";
import {fetchTopPosts} from "@/db/queries/post";
import {countTopPosts} from "@/db/queries/pageCounts";
import PageLister from "@/components/common/page-lister";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer";

interface SearchParamProps {
    searchParams?: {
        page?: string,
    }
}

export default async function Home({searchParams}: SearchParamProps) {
    const totalPosts = await countTopPosts()

    return (
        <>
            <div className="grid grid-cols-4 gap-4 p-4">
                <div className="col-span-3">
                    <h1>Posts go here</h1>
                    <PostList fetchData={() => fetchTopPosts(searchParams?.page)}/>
                </div>
                <div className="col-span-1">
                    <h1>Notifications go here</h1>
                    <Sidebar/>
                </div>
            </div>
            <PageLister page={searchParams?.page} totalItems={totalPosts}/>
            <Footer />
        </>

    );
}
