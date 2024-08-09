"use client";

import {Button} from "@nextui-org/button";
import {useFormStatus} from "react-dom";

interface FormButtonProps {
    children: React.ReactNode;
}

const FormButton = ({children}: FormButtonProps) => {
    const {pending} = useFormStatus()

    return (
        <Button type="submit" isLoading={pending}>
            {children}
        </Button>
    )
}
export default FormButton;
