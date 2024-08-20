'use client';

import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {useFormState} from "react-dom";
import { useActionState } from "react"; // Use this in a future release of Next js instead of useFormState
import * as actions from "@/actions";
import FormButton from "@/components/common/form-button";


interface PostCreateButtonProps {
    postId: string;
}

export default function PostDeleteButton({postId}: PostCreateButtonProps) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [state, formAction] = useFormState(actions.deletePost.bind(null, postId), null)

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete Post</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this post?</p>
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
