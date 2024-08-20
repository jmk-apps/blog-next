"use client";

import {Button} from "@nextui-org/button";
import {useFormStatus} from "react-dom";

interface FormButtonProps {
    children: React.ReactNode;
    color: any,
}

const FormButton = ({children, color}: FormButtonProps) => {
    const {pending} = useFormStatus()

    return (
        <Button type="submit" color={color} isLoading={pending}>
            {children}
        </Button>
    )
}
export default FormButton;
