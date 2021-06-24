import React, {Dispatch, RefObject, SetStateAction} from "react"

interface Props {
    sourceRef:  RefObject<HTMLDivElement |HTMLTextAreaElement>
    setIsAlertOpen: Dispatch<SetStateAction<boolean>>
    setAlertMessage: Dispatch<SetStateAction<string>>
}
export default function CopyToClipboardButton({sourceRef, setIsAlertOpen, setAlertMessage} : Props) {

    function copyToClipboard(sourceRef : RefObject<HTMLDivElement | HTMLTextAreaElement>) {
        if(sourceRef.current) {
            let sel: any;
            let range: any;
            let el = sourceRef.current; //get element id
            if (window.getSelection && document.createRange) { //Browser compatibility
                sel = window.getSelection();
                console.log(sel.toString())
                if (sel.toString() === '') { //no text selection
                    window.setTimeout(function () {
                        range = document.createRange(); //range object
                        range.selectNodeContents(el); //sets Range
                        sel.removeAllRanges(); //remove all ranges from selection
                        sel.addRange(range);//add Range to a Selection.

                        document.execCommand('copy')
                        sel.removeAllRanges()

                        setIsAlertOpen(true)
                        setAlertMessage("Copied to clipboard!")

                    }, 1);
                }
            }

            document.execCommand('copy')
            setIsAlertOpen(true)
            sel.removeAllRanges()
        }
    }


    return(
        <button
            className="btn btn-primary"
            onClick={() => copyToClipboard(sourceRef)}
        >
            Copy To Clipboard
        </button>
    )
}