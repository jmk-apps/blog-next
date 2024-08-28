'use server';

import type {Post} from "@prisma/client";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {z} from 'zod';
import {auth} from "@/auth";
import {db} from "@/db";
import paths from "@/paths";
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Image constants
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];


// Zod schema
const createPostSchema = z.object({
    title: z.string().min(3),
    subtitle: z.string().min(8),
    category: z.string({message: "You must select a category is required" }),
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

    // check if data validation failed.
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }


    // Check for authentication (is the user logged in?)
    const session = await auth();
    if (!session || !session.user) {
        return {
            errors: {
                _form: ['You must be signed in to do this.']
            }
        }
    }


    // Upload image to Cloudinary
    const image = formData.get('image') as string;
    const imageBuffer = await image.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    // Convert the image data to base64
    const imageBase64 = imageData.toString('base64');

    // Make request to upload to Cloudinary
    const image_result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`, {
            folder: 'blog-next'
        }
    );

    // Image url to store in the database
    const post_image = image_result.secure_url

    // Store the post data into the database
    let post: Post;
    try {
        post = await db.post.create({
            data: {
                title: result.data.title,
                subtitle: result.data.subtitle,
                category: result.data.category,
                content: result.data.content,
                userId: session.user.id,
                post_pic: post_image,
            }
        })


    } catch (err: unknown) {
        if (err instanceof Error) {
           return {
               errors: {
                   _form: [err.message]
               }
           }
       } else {
           return {
               errors: {
                   _form: ['Failed to create post']
               }
           }
       }
    }

    return {
        errors: {}
    }


    // TODO: revalidate the home page
    // revalidatePath(paths.home())

    // TODO: create the post show page
    // TODO: revalidate the post show page

    // redirect(paths.postShow(post.id))
}