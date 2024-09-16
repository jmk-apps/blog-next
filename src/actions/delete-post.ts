'use server'

import {revalidatePath} from "next/cache";
import {notFound, redirect} from "next/navigation";
import {db} from "@/db";
import type {Post} from "@prisma/client";
import paths from "@/paths";
import { toast } from 'react-toastify';


interface DeletePostFormState {
  errors: {
    _form?: string[];
  };
  success?: boolean;
}


export async function deletePost(postId: string, formState: DeletePostFormState,): Promise<DeletePostFormState> {
    let post: Post;

    try {
        // post = await db.post.delete({
        //     where: {
        //         id: postId,
        //     },
        // })

        // Remember to remove this delay

        console.log("This is from the delete post")

    } catch (err) {
        if (err instanceof Error) {
          return {
            errors: {
              _form: [err.message],
            },
          };
        } else {
          return {
            errors: {
              _form: ["Something went wrong..."],
            },
          };
        }
    }

    revalidatePath(paths.home())
    return {
        errors: {},
        success: true,
    };

}
