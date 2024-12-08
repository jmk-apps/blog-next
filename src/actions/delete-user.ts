'use server'

import {revalidatePath} from "next/cache";
import {notFound, redirect} from "next/navigation";
import {db} from "@/db";
import type {User} from "@prisma/client";
import paths from "@/paths";
import { toast } from 'react-toastify';


interface DeleteUserFormState {
    errors: {
        _form?: string[];
    };
    success?: boolean;
}


export async function deleteUser(userId: string, formState: DeleteUserFormState): Promise<DeleteUserFormState> {

    try {

        // Delete the User
        // const user = await db.user.delete({
        //     where: {
        //         id: userId,
        //     },
        // })


        console.log("This is from the delete user")

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

    revalidatePath(paths.users())
    return {
        errors: {},
        success: true,
    };
}



