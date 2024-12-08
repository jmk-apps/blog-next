'use client';

import React, {useEffect} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {useFormState} from "react-dom";
import { useActionState } from "react"; // Use this in a future release of Next js instead of useFormState
import * as actions from "@/actions";
import FormButton from "@/components/common/form-button";
import { toast } from 'react-toastify';
import { redirect } from "next/navigation";
import paths from "@/paths";
import type { UseDisclosureReturn } from '@nextui-org/use-disclosure';


interface UserDeleteButtonTableProps {
    userId: string;
    username: string;
    disclosure: UseDisclosureReturn;
}

export default function UserDeleteButtonTable({userId, username, disclosure}: UserDeleteButtonTableProps) {
    
    const { isOpen, onOpen, onOpenChange, onClose } = disclosure;
    const [formState, formAction] = useFormState(actions.deleteUser.bind(null, userId), { errors: {} })

    useEffect(() => {
        if (formState.success) {
            const notify = () => {
                toast.success("User successfully deleted!", {
                    position: "bottom-right",
                });
            }
    
            notify()
            redirect(paths.users())
    
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
        <>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Delete User</ModalHeader>
                  <ModalBody>
                    <p>Are you sure you want to delete user {username}?</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                      <form action={formAction}>
                        <FormButton color="danger">
                          Delete
                        </FormButton>
                      </form>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
    );

}


