'use client';


import classes from './image-picker.module.css';
import {useRef, useState} from "react";
import Image from "next/image";

interface ImagePickerProps {
    label: string;
    name: string;
}

export default function ImagePicker({label, name}: ImagePickerProps) {
    const [pickedImage, setPickedImage] = useState<any>();
    const imageInput = useRef(null);
    function handlePickClick() {
        imageInput.current.click();
    }

    function handleImageChange(event: any) {
       const file = event.target.files[0];

       if (!file) {
           setPickedImage(null);
           return;
       }

       const fileReader = new FileReader();

       fileReader.onload = () => {
          setPickedImage(fileReader.result);
       };

       fileReader.readAsDataURL(file);
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && (
                        <Image
                            src={pickedImage}
                            alt='The image selected by the user.'
                            fill
                        />
                    )}
                </div>
                <input
                    className={classes.input}
                    type='file'
                    id={name}
                    accept='image/png, image/jpeg, image/png'
                    name={name}
                    ref={imageInput}
                    onChange={handleImageChange}
                />
                <button className={classes.button} type='button' onClick={handlePickClick}>
                    Pick an Image
                </button>
            </div>
        </div>
    )
}