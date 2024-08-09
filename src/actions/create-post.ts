'use server';

import type {Post} from "@prisma/client";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {z} from 'zod';
import {auth} from "@/auth";
import {db} from "@/db";
import paths from "@/paths";

// Image constants
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];


// Zod schema
const createPostSchema = z.object({
    title: z.string().min(3),
    subtitle: z.string().min(8),
    category: z.string().min(4),
    content: z.string().min(30),
    image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and formats are supported."
    )
});

// Form state
interface CreatePostFormState {
    errors: {
        title?: string[],
        subtitle?: string[],
        category?: string[],
        content?: string[],
        image?: string[],
        _form?: string[],
    }
}



export async function createPost(formState: CreatePostFormState, formData: FormData) : Promise<CreatePostFormState> {

    // Check if inputted data is correct.
    const result = createPostSchema.safeParse({
        title: formData.get('title'),
        subtitle: formData.get('subtitle'),
        category: formData.get('category'),
        content: formData.get('content'),
        image: formData.get('image'),
    })

    if (!result.success) {
        // return {
        //     errors: result.error.flatten().fieldErrors
        // }

        console.log(result.error.flatten().fieldErrors)
    }

    // Check for authentication (is the user logged in?)



    return {
        errors : {

        }
    }


    // TODO: revalidate the home page
    // TODO: revalidate the post show page
}