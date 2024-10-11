'use server'

import {revalidatePath} from "next/cache";
import {notFound, redirect} from "next/navigation";
import {db} from "@/db";
import type {Newsletter} from "@prisma/client";
import paths from "@/paths";
import { toast } from 'react-toastify';
import { v2 as cloudinary } from 'cloudinary';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Set up email
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({username: 'mailgunAPIkey', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'});


interface EmailNewsletterFormState {
  errors: {
    _form?: string[];
  };
  success?: boolean;
}


export async function emailNewsletter(newsletterId: string, formState: EmailNewsletterFormState): Promise<EmailNewsletterFormState> {
    let newsletter: Newsletter;

    try {

        // Get the list of subscribers
        const subscribers = await db.subscriber.findMany()

        // Check if there are any subscribers
        if (!subscribers) {
            return {
                errors: {
                    _form: ["There are no subscribers in the subscriber list."],
                }
            }
        }

        // Get the newsletter
        const newsletter = await db.newsletter.findUnique({
            where: {id: newsletterId}
        })

        // Get the download link
        const newsletter_url = cloudinary.image(newsletter.newsletterFile,{flags: `attachment`})

        // Extract the url
        const urlIndex1 = newsletter_url.indexOf("'");
        const urlIndex2 = newsletter_url.lastIndexOf("'");
        const url = newsletter_url.slice(urlIndex1, urlIndex2+1)

        // Email each of the subscribers the newsletter link
        // for (let i = 0; i < subscribers.length; i++) {
        //
        // }


        console.log("This is from the delete newsletter");
        console.log(newsletter_url);
        console.log(url);

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

    return {
        errors: {},
        success: true,
    };

}




