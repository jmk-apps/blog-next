'use server';

import {revalidatePath} from "next/cache";
import {notFound, redirect} from "next/navigation";
import {db} from "@/db";
import type {Post} from "@prisma/client";
import paths from "@/paths";


export async function deletePost(postId: string): Promise<void> {
    let post: Post;

    console.log("This is the deletePost function")

    // try {
    //     post = await db.post.delete({
    //         where: {
    //             id: postId,
    //         },
    //     })
    // } catch (err) {
    //     if (err instanceof Error) {
    //        console.log(err.message)
    //        notFound()
    //    } else {
    //        console.log('Failed to delete post ', postId)
    //        notFound()
    //    }
    // }
    //
    revalidatePath(paths.home())
    redirect(paths.home())

}
