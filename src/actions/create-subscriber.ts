'use server';

import type {Subscriber} from "@prisma/client";
import {db} from "@/db";
import {z} from 'zod';
import {revalidatePath} from "next/cache";
import paths from "@/paths";


// Zod schema
const createSubscriberSchema = z.object({
    email: z.string().email(),
});

// Form state
interface CreateSubscriberFormState {
    errors: {
        email?: string[],
        _form?: string[],
    };
    success?: boolean;
}

export async function createSubscriber(formState: CreateSubscriberFormState, formData: FormData) : Promise<CreateSubscriberFormState> {

    // Check if inputted data is correct.
    const result = createSubscriberSchema.safeParse({
        email: formData.get('email')
    })

    // check if data validation failed.
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    let subscriber, newSubscriber;
    try {

        //Check if that email has already been added to the list
        subscriber = await db.subscriber.findUnique({
            where: {
                email: result.data.email
            }
        })

        if (subscriber !== null) {
           return {
            errors: {
              _form: ["Subscriber is already in the subscriber list"],
            },
          };

        }

        // Add a new subscriber
        newSubscriber = await db.subscriber.create({
            data: {
                email: result.data.email,
            }
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
              _form: ["Failed to add to the subscriber list"],
            },
          };
        }
    }

    return {
        errors: {},
        success: true,
    };

}
