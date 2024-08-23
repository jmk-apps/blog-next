"use client";

import { useFormState } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { Textarea, Button } from "@nextui-org/react";
import FormButton from "@/components/common/form-button";
import * as actions from "@/actions";

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
}

export default function CommentCreateForm({
  postId,
  parentId,
}: CommentCreateFormProps) {
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action] = useFormState(
    actions.createComment.bind(null, { postId, parentId }),
    { errors: {} }
  );

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();
    }
  }, [formState]);


  return (
      <form action={action} ref={ref}>
          <div className="space-y-2 px-1">
              <Textarea
                  name="content"
                  label="Write a comment"
                  placeholder="Comment here..."
                  isInvalid={!!formState.errors.content}
                  errorMessage={formState.errors.content?.join(", ")}
              />

              {formState.errors._form ? (
                  <div className="p-2 bg-red-200 border rounded border-red-400">
                      {formState.errors._form?.join(", ")}
                  </div>
              ) : null}

              <FormButton color="success">Post</FormButton>
          </div>
      </form>
  );
}
