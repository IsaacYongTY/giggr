import React, {Dispatch, RefObject, SetStateAction } from "react"

interface Props {
    sourceRef:  RefObject<HTMLDivElement |HTMLTextAreaElement>
    setAlertMessage: Dispatch<SetStateAction<string>>
    setAlertType: Dispatch<SetStateAction<string>>
}
export default function CopyToClipboardButton({sourceRef, setAlertMessage, setAlertType} : Props) {

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

                        setAlertMessage("Copied to clipboard!")
                        setAlertType("success")

                    }, 1);
                }
            }

            document.execCommand('copy')
            sel.removeAllRanges()


            setTimeout(() => {
                setAlertMessage("")
                setAlertType("")
            }, 3000)

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