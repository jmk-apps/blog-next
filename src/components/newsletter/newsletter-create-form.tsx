'use client';

import {useFormState} from "react-dom";
import {useEffect, useRef} from "react";
import {Input, Select, SelectItem, Textarea} from "@nextui-org/react";
import FormButton from "@/components/common/form-button";
import {toast} from 'react-toastify';
import * as actions from "@/actions";
import {categories} from "@/lib/help-functions";
import ImagePicker from "@/components/images/image-picker";


export default function NewsletterCreateForm() {
    const [formState, action]= useFormState(
        actions.createNewsletter, { errors: {} }
    );

    // Update the below for the Newsletter
    return (
        <>
            <form action={action}>
                <div className="flex flex-col gap-4 p-4 w-80">
                    <h3 className="text-lg">Create Newsletter</h3>
                    <Input
                        name="subject"
                        label="Subject"
                        labelPlacement="outside"
                        placeholder="Enter the subject"
                        isRequired
                        isInvalid={!!formState.errors.subject}
                        errorMessage={formState.errors.subject}
                    />
                    <Input
                        name="message"
                        label="Message"
                        labelPlacement="outside"
                        placeholder="Enter the message"
                        isRequired
                        isInvalid={!!formState.errors.message}
                        errorMessage={formState.errors.message}
                    />

                    <label htmlFor="newsletterFile">Newsletter</label>
                    <input
                        id="newsletterFile"
                        name="newsletterFile"
                        type="file"
                        accept="application/pdf"
                    />

                    {formState.errors._form && (
                        <p className="text-red-500">{formState.errors._form}</p>
                    )}

                    <FormButton color="primary">Create</FormButton>
                </div>
            </form>
        </>
    )
}


