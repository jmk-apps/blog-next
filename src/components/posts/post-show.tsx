import {db} from "@/db";
import {notFound} from "next/navigation";
import Image from "next/image";
import sanitizeHtml from 'sanitize-html';
import PostDeleteButton from "@/components/posts/post-delete-button";
import {formatDate} from "@/lib/help-functions";
import {auth} from "@/auth";

interface PostShowProps {
    postId: string;
}

export default async function PostShow({postId}: PostShowProps) {
    // Uncomment the below to test the loading skeleton.
    // await new Promise(resolve => setTimeout(resolve, 2500));
    const session = await auth()

   const post = await db.post.findFirst({
       where: {id: postId},
       include: {
           user: {select: {name: true, id: true}}
       }
   })

   if (!post) {
       notFound()
   }

   
   //Format the date
    let post_date: string;
    post_date = formatDate(post.createdAt)


   // Sanitize the content
   const clean_content = sanitizeHtml(post.content)

   // Remove
   
  return (
      <div className="m-4">
          <p className="text-sm">{post_date} in {post.category}</p>
          <p className="text-sm">{post.user.name}</p>
          <h1 className="text-2xl font-bold my-2">{post.title}</h1>
          <div>
              <Image
                  src={post.post_pic} alt="image of the post"
                  height={0}
                  width={0}
                  sizes='100vw'
                  className='object-fill h-60 w-full'
              />
          </div>
          <h3 className="font-bold">{post.subtitle} </h3>
          <div dangerouslySetInnerHTML={{__html: clean_content}}/>
          {session?.user?.id === post.user.id && (<PostDeleteButton postId={postId} />)}
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
      </div>
  );
}
