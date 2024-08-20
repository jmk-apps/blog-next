'use client';


import {useFormState} from "react-dom";
import { useState } from 'react';
import {
    Input,
    Button,
    Textarea
} from "@nextui-org/react";
import * as actions from "@/actions";
import FormButton from "@/components/common/form-button";
import dynamic from "next/dynamic";
import {set} from "zod";
import ImagePicker from "@/components/images/image-picker";

const CustomEditor = dynamic( () => import( '@/components/ckeditor/custom-editor' ), { ssr: false } );

export default function PostCreateForm() {
    const [formState, action]= useFormState(
        actions.createPost, { errors: {} } // TODO remember to create this method in the actions folder
    );

    const [content, setContent] = useState()

    const updateContent = (data: any) => {
        setContent(data);
    }


    return (
        <>
            <form action={action}>
                <div className="flex flex-col gap-4 p-4 w-80">
                    <h3 className="text-lg">Create a Post</h3>
                    <Input
                        name="title"
                        label="Title"
                        labelPlacement="outside"
                        placeholder="title"
                        isRequired
                        isInvalid={!!formState.errors.title}
                        errorMessage={formState.errors.title}
                    />
                    <Input
                        name="subtitle"
                        label="Subtitle"
                        labelPlacement="outside"
                        placeholder="subtitle"
                        isRequired
                        isInvalid={!!formState.errors.subtitle}
                        errorMessage={formState.errors.subtitle}
                    />
                    <Input
                        name="category"
                        label="Category"
                        labelPlacement="outside"
                        placeholder="category"
                        isRequired
                        isInvalid={!!formState.errors.category}
                        errorMessage={formState.errors.category}
                    />
                    <div>
                        <h3>Content</h3>
                        <textarea value={content} name="content" hidden></textarea>
                        <CustomEditor setData={updateContent} />
                        {formState.errors.content && (
                            <p className="text-red-500">{formState.errors.content}</p>
                        )}
                    </div>
                    <div>
                      <ImagePicker label="Post Image" name="image" />
                        {formState.errors.image && (
                            <p className="text-red-500">{formState.errors.image}</p>
                        )}
                    </div>

                    <FormButton color="success">Create Post</FormButton>
                </div>
            </form>
        </>

    )

}