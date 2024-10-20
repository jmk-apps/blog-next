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
import { emailHTMLMessage } from "@/lib/email-message";

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

        if (!newsletter) {
          return {
            errors: {
                _form: ["Newsletter was not found in the database."],
            }
          }
        }


        // Get the download link
        const newsletter_url = cloudinary.url(newsletter.newsletterFile)
        

        // Fetch the data from cloudinary
        const response = await fetch(newsletter_url)


        if ((response.status !== 200)) {
            return {
              errors: {
                  _form: ["Something went wrong with the file..."],
              }
          }
        }
        
        // Get file
        const fileBuffer = await response.arrayBuffer()
        const fileData = Buffer.from(fileBuffer)

        // Get the name of the file without the extension and folder
        const newsletterNameWithExtension = newsletter.newsletterFile.split("/")[1]
        const newsletterName = newsletterNameWithExtension.split(".")[0]
        

        // Prepare the attachement for mailgun
        const newsletter_attachment = {
            data: fileData,
            filename: `He@d$p@ce ${newsletterNameWithExtension}`, // Specify the filename here with the extension
            contentType: 'application/pdf', // Adjust the content type based on your file
        };


        // Get the html version for the email message
        const email_msg = emailHTMLMessage(newsletterName);

        // Email each of the subscribers the newsletter link
        for (let i = 0; i < subscribers.length; i++) {
            await mg.messages.create('sandboxfc8ff5f74f9c4b9ca7ce1aa7f7670528.mailgun.org', {
            from: "He@d$p@ce <mailgun@sandboxfc8ff5f74f9c4b9ca7ce1aa7f7670528.mailgun.org>",
            to: [subscribers[i].email],
            subject: `He@d$p@ce ${newsletterName} Newsletter`,
            html: email_msg,
            attachment: [newsletter_attachment],
          })
        }

        // update the date email property of the newsletter
        const current_date = new Date()
        const updated_newsletter = await db.newsletter.update({
          where: {id: newsletterId},
          data: {dateEmailed: current_date}
        })

        
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


    // Might have to revalidate the newsletter route
    revalidatePath(paths.newsletterShow(newsletterId))
    return {
        errors: {},
        success: true,
    };

}




