import PostCreateForm from "@/components/posts/post-create-form";
import { checkAdmin, checkBlogger } from "@/lib/auth-functions";
import paths from "@/paths";
import { redirect } from "next/navigation";


export default async function PostCreatePage() {

    if ((!await checkAdmin()) || (!await checkBlogger())) {
        redirect(paths.home())
    }

    return (
        <>
            <div>Post Create Page</div>
            <PostCreateForm />
        </>


    )
}