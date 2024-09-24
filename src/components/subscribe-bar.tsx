'use client';

import {useFormState} from "react-dom";
import {useEffect, useRef} from "react";
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import {Input} from "@nextui-org/react";
import * as actions from "@/actions";
import FormButton from "@/components/common/form-button";



export default function SubscribeBar() {
    const ref = useRef<HTMLFormElement | null>(null);
    const [formState, action]= useFormState(
        actions.createSubscriber, { errors: {} }
    );

    useEffect(() => {
        if (formState.success) {
          const notify = () => {
                toast.success("You have been added to the subsciber list.", {
                position: "bottom-right"
              });
          }
          ref.current?.reset();
          notify();
        }

        if (formState.errors._form) {
            const notify = () => {
                toast.error(`${formState.errors._form?.join(", ")}`, {
                    position: "bottom-right",
                });
            }
            notify()
        }
      }, [formState]);

    return (
        <div>
            <h1 className="font-bold">Subscribe to our newsletter</h1>
            <p>Join our monthly newsletter and never miss out on new stories and promotions.</p>
            <form action={action} ref={ref}>
                <div className="flex">
                    <Input
                    name="email"
                    placeholder="Email address"
                    isRequired
                    isInvalid={!!formState.errors.email}
                    errorMessage={formState.errors.email}
                    />
                    <FormButton color="success">SUBSCRIBE</FormButton>
                </div>
            </form>
        </div>
    )
}

