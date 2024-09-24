'use client';

import {useFormState} from "react-dom";
import {useEffect, useRef} from "react";
import {Input, Textarea} from "@nextui-org/react";
import FormButton from "@/components/common/form-button";
import {Bounce, toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import * as actions from "@/actions";

export default function ContactCreateForm() {
    const ref = useRef<HTMLFormElement | null>(null);
    const [formState, action]= useFormState(
        actions.createContact, { errors: {} }
    );

    const notify = () => {
            toast.success("Your message was sent!", {
            position: "bottom-right"
          });
    }

    useEffect(() => {
        if (formState.success) {
          ref.current?.reset();
          notify();
        }
      }, [formState]);

    return (
        <>
            <form action={action} ref={ref}>
                <div>
                    <h1 className="font-bold mb-3">Get in touch</h1>
                    <p className="mb-2">
                        At <span className="font-bold">He@d$p@ce</span> we offer more than just blogs with excellent
                        advice to get you in the right head space,
                        we also do workshops where companies can send their employees for team building and educate them
                        in not only building but also sustaining a great work environment. We believe that excellent
                        mental health is
                        something that does not require you having to go on vacation or retreats only, but it is
                        something that
                        you can get with the right tools and attitude where ever you are. You might just have a query
                        you would
                        like to discuss with us, that's okay too. You can contact us by filling in the form below. We
                        will get back to
                        as soon as we can.
                    </p>
                    <Input
                        name="name"
                        label="Name"
                        labelPlacement="outside"
                        placeholder="name"
                        isRequired
                        isInvalid={!!formState.errors.name}
                        errorMessage={formState.errors.name}
                    />
                    <Input
                        name="email"
                        label="Email"
                        labelPlacement="outside"
                        placeholder="email"
                        isRequired
                        isInvalid={!!formState.errors.email}
                        errorMessage={formState.errors.email}
                    />
                    <Textarea
                        name="message"
                        label="Message"
                        labelPlacement="outside"
                        placeholder="message"
                        isRequired
                        isInvalid={!!formState.errors.message}
                        errorMessage={formState.errors.message}
                    />

                    {formState.errors._form && (
                        <p className="text-red-500">{formState.errors._form}</p>
                    )}
                    <FormButton color="success">Send</FormButton>
                </div>
            </form>
        </>
    )
}