

import type { Post, User} from '@prisma/client';
import Link from 'next/link';
import paths from '@/paths';
import {fetchTopPosts, PostWithData} from '@/db/queries/post';
import Image from "next/image";
import PostDeleteButton from "@/components/posts/post-delete-button";
import {helpFunctions} from "@/lib/help-functions";
import {Button} from "@nextui-org/react";

interface PostListProps {
  fetchData: () => Promise<PostWithData[]>;
}


export default async function PostListHome() {
  const posts = await fetchTopPosts();

  const renderedPosts = posts.map((post) => {

    return (
      <div key={post.id} className="border rounded p-2">
          <div className="m-4">
            <p className="text-sm">{post.user.name} {helpFunctions(post.createdAt)} in {post.category}</p>
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
            <Button
              href={paths.postShow(post.id)}
              as={Link}
              color="primary"
              variant="solid"
            >
              READ MORE...
            </Button>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
          </div>
      </div>
    );
  });

  return <div className="space-y-2">{renderedPosts}</div>;
}
