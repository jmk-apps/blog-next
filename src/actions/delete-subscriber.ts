'use server';

import {revalidatePath} from "next/cache";
import {notFound, redirect} from "next/navigation";
import {db} from "@/db";
import type {Subscriber} from "@prisma/client";
import paths from "@/paths";
import { toast } from 'react-toastify';


interface DeleteSubscriberFormState {
    errors: {
        _form?: string[];
    };
    success?: boolean;
}


export async function deleteSubscriber(subscriberId: string, formState: DeleteSubscriberFormState): Promise<DeleteSubscriberFormState> {
    let subscriber: Subscriber;

    try {

        // Delete the subscriber
        // subscriber = await db.subscriber.delete({
        //     where: {
        //         id: subscriberId,
        //     },
        // })


        console.log("This is from the delete subscriber")

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


    revalidatePath(paths.subscribers())
    return {
        errors: {},
        success: true,
    };

}