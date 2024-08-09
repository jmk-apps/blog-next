// components/custom-editor.js
'use client' // only in App Router

import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from 'ckeditor5';


import 'ckeditor5/ckeditor5.css';
import {useRef} from "react";
import {set} from "zod";

interface CreateEditorProps {
    setData: (data: any) => void;
}

function CustomEditor({setData}: CreateEditorProps): JSX.Element {
    return (
        <CKEditor
            onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { data } );
                        setData( data );
            } }
            editor={ ClassicEditor }
            config={ {
                toolbar: {
                    items: [ 'undo', 'redo', '|', 'bold', 'italic' ],
                },
                plugins: [
                    Bold, Essentials, Italic, Mention, Paragraph, Undo
                ],
            } }
        />
    );
}

export default CustomEditor;
