import {Suspense} from "react";
import PostShow from "@/components/posts/post-show";
import PostShowLoading from "@/components/posts/post-show-loading";
import CommentCreateForm from "@/components/comments/comment-create-form";
import CommentList from "@/components/comments/comment-list";
import {fetchCommentsByPostId} from "@/db/queries/comments";


interface PostShowPageProps {
    params: {
        postId: string;
    }
}


export default function PostShowPage({params}: PostShowPageProps) {
    const {postId} = params;

    return (
        <div className="space-y-3">
           <Suspense fallback={<PostShowLoading />}>
              <PostShow postId={postId} />
           </Suspense>
            <CommentCreateForm postId={postId} />
            <CommentList fetchData={() => fetchCommentsByPostId(postId)} />
        </div>
  );
}