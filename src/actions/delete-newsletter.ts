'use server'

import {revalidatePath} from "next/cache";
import {notFound, redirect} from "next/navigation";
import {db} from "@/db";
import type {Newsletter} from "@prisma/client";
import paths from "@/paths";
import { toast } from 'react-toastify';


interface DeleteNewsletterFormState {
  errors: {
    _form?: string[];
  };
  success?: boolean;
}


export async function deleteNewsletter(newsletterId: string, formState: DeleteNewsletterFormState): Promise<DeleteNewsletterFormState> {
    let newsletter: Newsletter;

    try {

        // Delete the newsletter
        // newsletter = await db.newsletter.delete({
        //     where: {
        //         id: newsletterId,
        //     },
        // })


        console.log("This is from the delete newsletter")

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

    revalidatePath(paths.newsletters())
    return {
        errors: {},
        success: true,
    };

}




