"use client";

import {Button} from "@nextui-org/button";
import {useFormStatus} from "react-dom";
import { toast } from 'react-toastify';
import {useEffect} from "react";

interface DeleteFormButtonProps {
    children: React.ReactNode;
    color: any,
}

const DeleteFormButton = ({children, color}: DeleteFormButtonProps) => {
    const {pending} = useFormStatus()
    let state = false


    useEffect(() => {
        const notify = () => {
            toast.success("Post deleted", {
            position: "bottom-right"
          });
        }

        console.log("pending: ",pending)
        console.log("state: ",state)
        // state = !state

        if (!pending && state) {
            notify()
        }
    }, [pending]);

    return (
        <Button type="submit" color={color} isLoading={pending} >
            {children}
        </Button>
    )
}
export default DeleteFormButton;
