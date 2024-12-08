'use server';

import {redirect} from "next/navigation";
import paths from "@/paths";
import { revalidatePath } from "next/cache";


interface getUsersFormState {
    success?: boolean;
    route_path?: string;
}


export async function getUsers(formState: getUsersFormState, formData: FormData): Promise<getUsersFormState> {
    const email = formData.get('email');
    const name = formData.get('name');
    const roleAdmin = formData.get('roleAdmin');
    const roleBlogger = formData.get('roleBlogger');
    const roleUser = formData.get('roleUser');
    const dateCreatedTo = formData.get('dateCreatedTo');
    const dateCreatedFrom = formData.get('dateCreatedFrom');


    let route_path = `/users?page=1`

    if (email) {
        route_path += `&email=${email}`
    }
    if (name) {
        route_path += `&name=${name}`
    }
    if (roleAdmin === 'true') {
        route_path += `&roleAdmin=${roleAdmin}`
    }
    if (roleBlogger === 'true') {
        route_path += `&roleBlogger=${roleBlogger}`
    }
    if (roleUser === 'true') {
        route_path += `&roleUser=${roleUser}`
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
