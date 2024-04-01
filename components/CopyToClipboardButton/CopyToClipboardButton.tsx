import React, { RefObject } from 'react';
import { message } from 'antd';

type CopyToClipboardButtonProps = {
    sourceRef: RefObject<HTMLDivElement | HTMLTextAreaElement>;
};

export default function CopyToClipboardButton({
    sourceRef,
}: CopyToClipboardButtonProps) {
    function copyToClipboard(
        sourceRef: RefObject<HTMLDivElement | HTMLTextAreaElement>,
    ) {
        if (sourceRef.current) {
            let sel: any;
            let range: any;

            const el = sourceRef.current; //get element id
            if (window.getSelection && document.createRange) {
                //Browser compatibility
                sel = window.getSelection();

                if (sel.toString() === '') {
                    //no text selection
                    window.setTimeout(function () {
                        range = document.createRange(); //range object
                        range.selectNodeContents(el); //sets Range
                        sel.removeAllRanges(); //remove all ranges from selection
                        sel.addRange(range); //add Range to a Selection.

                        document.execCommand('copy');
                        sel.removeAllRanges();
                    }, 1);
                }
            }

            document.execCommand('copy');
            sel.removeAllRanges();
        }
    }

    const handleCopyToClipboard = () => {
        copyToClipboard(sourceRef);
        message.success('Copied to clipboard');
    };
    return (
        <button className="btn btn-secondary" onClick={handleCopyToClipboard}>
            Copy To Clipboard
        </button>
    );
}
