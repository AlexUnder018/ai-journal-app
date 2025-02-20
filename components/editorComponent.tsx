'use client';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = dynamic(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
);

const htmlToDraft = dynamic(
    () => import('html-to-draftjs').then((mod) => mod.default),
    { ssr: false }
);

const WysiwygComponent = ({ data, onChange }) => {

    // Assuming 'data' has the HTML text you need to view

    useEffect(() => {
        let isMounted = true; // ✅ Track if the component is mounted

        if (data && isMounted) {
            const contentBlocks = convertFromHTML(data);
            const contentState = ContentState.createFromBlockArray(
                contentBlocks.contentBlocks,
                contentBlocks.entityMap
            );
            setEditorState(EditorState.createWithContent(contentState));
        }

        return () => {
            isMounted = false; // ✅ Prevent updating state if unmounted
        };
    }, []);


    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
        const plainText = newEditorState.getCurrentContent().getPlainText();
        const rawContent = convertToRaw(newEditorState.getCurrentContent());
        const html = draftToHtml(rawContent);
        onChange(html);
        // onChange(plainText); // Send plain text to parent
    };

    return (

        <>
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
                toolbar={{
                    options: ["blockType","inline", "list", "textAlign", "history"],
                    blockType: { options: ["H1", "H2", "H3", "Blockquote"] },

                    inline: {
                        options: ["bold", "italic", "underline", "strikethrough"],
                    },
                    list: {
                        options: ["unordered", "ordered"],
                    },
                    textAlign: {
                        options: ["left", "center", "right"],
                    },
                    history: {
                        options: ["undo", "redo"],
                    },
                }}
            />
        </>

    );
};

export default WysiwygComponent;