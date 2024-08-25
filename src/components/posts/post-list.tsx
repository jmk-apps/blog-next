import type { Post, User} from '@prisma/client';
import Link from 'next/link';
import paths from '@/paths';
import type {PostWithData} from '@/db/queries/post';
import Image from "next/image";
import PostDeleteButton from "@/components/posts/post-delete-button";

interface PostListProps {
  fetchData: () => Promise<PostWithData[]>;
}


export default async function PostList({fetchData}: PostListProps) {
  const posts = await fetchData();

  const renderedPosts = posts.map((post) => {

    return (

        <div>Post List</div>
      // <div key={post.id} className="border rounded p-2">
      //   <Link href={paths.postShow(post.id)}>
      //     <div className="m-4">
      //       <p className="text-sm">{post_date} in {post.category}</p>
      //       <p className="text-sm">{post.user.name}</p>
      //       <h1 className="text-2xl font-bold my-2">{post.title}</h1>
      //       <div>
      //         <Image
      //             src={post.post_pic} alt="image of the post"
      //             height={0}
      //             width={0}
      //             sizes='100vw'
      //             className='object-fill h-60 w-full'
      //         />
      //       </div>
      //       <h3 className="font-bold">{post.subtitle} </h3>
      //       <div dangerouslySetInnerHTML={{__html: clean_content}}/>
      //       <PostDeleteButton postId={postId}/>
      //       <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
      //     </div>
      //   </Link>
      // </div>
    );
  });

  return <div className="space-y-2">{renderedPosts}</div>;
}
