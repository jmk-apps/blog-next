'use server';

import {redirect} from "next/navigation";
import paths from "@/paths";
import { revalidatePath } from "next/cache";


// Form state
interface getNewslettersFormState {
    success?: boolean;
    route_path?: string;
}


export async function getNewsletters(formState: getNewslettersFormState, formData: FormData): Promise<getNewslettersFormState> {
    const subject = formData.get('subject');
    const author = formData.get('author');
    const newsletter = formData.get('newsletter');
    const dateCreatedTo = formData.get('dateCreatedTo');
    const dateCreatedFrom = formData.get('dateCreatedFrom');
    const dateEmailedTo = formData.get('dateEmailedTo');
    const dateEmailedFrom = formData.get('dateEmailedFrom');

    console.log("this is from get-newsletters");
    console.log(`dateCreatedTo: ${dateCreatedTo}, dateCreatedFrom: ${dateCreatedFrom}`)

    

    let route_path = `/newsletters?page=1`

    if (subject) {
        route_path += `&subject=${subject}`
    }
    if (author) {
        route_path += `&author=${author}`
    }
    if (newsletter) {
        route_path += `&newsletter=${newsletter}`
    }
    if (dateCreatedFrom) {
        route_path += `&dateCreatedFrom=${dateCreatedFrom}`
    }
    if (dateCreatedTo) {
        route_path += `&dateCreatedTo=${dateCreatedTo}`
    }
    if (dateEmailedTo) {
        route_path += `&dateEmailedTo=${dateEmailedTo}`
    }
    if (dateEmailedFrom) {
        route_path += `&dateEmailedFrom=${dateEmailedFrom}`
    }

    revalidatePath(route_path);

    return {
        success: true,
        route_path: route_path
    };
    

}
