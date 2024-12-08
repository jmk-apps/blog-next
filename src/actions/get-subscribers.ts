'use server';

import {redirect} from "next/navigation";
import paths from "@/paths";
import { revalidatePath } from "next/cache";


interface getSubscribersFormState {
    success?: boolean;
    route_path?: string;
}


export async function getSubscribers(formState: getSubscribersFormState, formData: FormData): Promise<getSubscribersFormState> {
    const email = formData.get('email');
    const dateCreatedTo = formData.get('dateCreatedTo');
    const dateCreatedFrom = formData.get('dateCreatedFrom');

    
    console.log(`dateCreatedTo: ${dateCreatedTo}, dateCreatedFrom: ${dateCreatedFrom}`)

    

    let route_path = `/subscribers?page=1`

    if (email) {
        route_path += `&email=${email}`
    }
    if (dateCreatedFrom) {
        route_path += `&dateCreatedFrom=${dateCreatedFrom}`
    }
    if (dateCreatedTo) {
        route_path += `&dateCreatedTo=${dateCreatedTo}`
    }

    revalidatePath(route_path);

    return {
        success: true,
        route_path: route_path
    };
    

}
