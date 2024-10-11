'use server';

import type {Newsletter} from "@prisma/client";
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


//  File constants
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_NEWSLETTER_TYPES = ["application/pdf"];


// Zod schema
const createNewsletterSchema = z.object({
    subject: z.string().min(3),
    message: z.string().min(30),
    newsletterFile: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_NEWSLETTER_TYPES.includes(file?.type),
      "Only .pdf format is supported."
    )
});

// Form state
interface CreateNewsletterFormState {
    errors: {
        subject?: string[],
        message?: string[],
        newsletterFile?: string[],
        _form?: string[],
    }
}


export async function createNewsletter(formState: CreateNewsletterFormState, formData: FormData) : Promise<CreateNewsletterFormState> {

    // Check if inputted data is correct.
    const result = createNewsletterSchema.safeParse({
        subject: formData.get('subject'),
        message: formData.get('message'),
        newsletterFile: formData.get('newsletterFile'),
    })

    // check if data validation failed.
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    // Update the below to only allow 'Bloggers' to send newsletters.
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
    const newsletterFile = formData.get('newsletterFile') as string;
    const newsletterFileBuffer = await newsletterFile.arrayBuffer();
    const newsletterFileArray = Array.from(new Uint8Array(newsletterFileBuffer));
    const newsletterFileData = Buffer.from(newsletterFileArray);

    // Convert newsletter data to base 64
    const newsletterFileBase64 = newsletterFileData.toString('base64');

    // Make request to upload to Cloudinary
    const newsletterFile_result = await cloudinary.uploader.upload(
        `data:application/pdf;base64,${newsletterFileBase64}`, {
            folder: 'blog-next'
        }
    );

    // file url to store in the database
    // const newsletter_file = newsletterFile_result.secure_url
       const newsletter_file = `${newsletterFile_result.public_id}.${newsletterFile_result.format}`


    // Store the data in the database
    let newsletter: Newsletter;
    try {
        newsletter = await db.newsletter.create({
            data: {
                subject: result.data.subject,
                message: result.data.message,
                newsletterFile: newsletter_file,
                author: session.user.name
            }
        })

        console.log("This is from create-newsletter.ts")

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
                   _form: ['Failed to create newsletter']
               }
           }
       }
    }

    console.log("Done creating the newsletter.")

    // Remember to remove this after testing is done
    return {
        errors: {}
    }

    // Revalidate the newsletter page
    // revalidatePath(paths.newsletter())

    // Redirect to the newsletter show page
    // redirect(paths.newsletterShow(newsletter.id))

}

