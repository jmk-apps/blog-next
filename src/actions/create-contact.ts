'use server';


import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {z} from 'zod';
import paths from "@/paths";
import formData from 'form-data';
import Mailgun from 'mailgun.js';



// Set up email
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({username: 'mailgunAPIkey', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'});

// Zod schema
const createPostSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    message: z.string().min(10),
});

// Form state
interface CreateContactFormState {
    errors: {
        name?: string[],
        email?: string[],
        message?: string[],
        _form?: string[],
    };
    success?: boolean;
}



export async function createContact(formState: CreateContactFormState, formData: FormData) : Promise<CreateContactFormState> {



    // Check if inputted data is correct.
    const result = createPostSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
    })

    // check if data validation failed.
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    //Send the query to the support email
    try {
        // await mg.messages.create('sandboxfc8ff5f74f9c4b9ca7ce1aa7f7670528.mailgun.org', {
        //     from: "Excited User <mailgun@sandboxfc8ff5f74f9c4b9ca7ce1aa7f7670528.mailgun.org>",
        //     to: ["jkaganda@gmail.com", "kagandajohn762@gmail.com"],
        //     subject: "Hello Mailgun test",
        //     text: `${result.data.message}`,
        //     // html: "<h1>Testing some Mailgun awesomeness!</h1>" if this is uncommented,
        //     // the email will show this instead of the text
        //   })
        console.log("From the create-contact.ts file")
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
                   _form: ['Failed to send the message']
               }
           }
       }
    }


    return {
        errors: {},
        success: true,
    };
}
