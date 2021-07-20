import React, {Dispatch, RefObject, SetStateAction } from "react"

interface Props {
    sourceRef:  RefObject<HTMLDivElement |HTMLTextAreaElement>
    setAlertOptions: Dispatch<SetStateAction<{ message: string, type: string}>>
}
export default function CopyToClipboardButton({sourceRef, setAlertOptions } : Props) {

    function copyToClipboard(sourceRef : RefObject<HTMLDivElement | HTMLTextAreaElement>) {

        if(sourceRef.current) {
            let sel: any;
            let range: any;

            let el = sourceRef.current; //get element id
            if (window.getSelection && document.createRange) { //Browser compatibility
                sel = window.getSelection();

                if (sel.toString() === '') { //no text selection
                    window.setTimeout(function () {
                        range = document.createRange(); //range object
                        range.selectNodeContents(el); //sets Range
                        sel.removeAllRanges(); //remove all ranges from selection
                        sel.addRange(range);//add Range to a Selection.

                        document.execCommand('copy')
                        sel.removeAllRanges()

                        setAlertOptions({
                            message: "Copied to clipboard!",
                            type: "success"
                        })
                    }, 1);
                }
            }

            document.execCommand('copy')
            sel.removeAllRanges()


            // setTimeout(() => {
            //     setAlertOptions({
            //         message: "",
            //         type: ""
            //     })
            // }, 3000)

        }
    }


    return(
        <button
            className="btn btn-secondary"
            onClick={() => copyToClipboard(sourceRef)}
        >
            Copy To Clipboard
        </button>
    )
}