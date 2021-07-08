import React from "react"
import "./button-with-loader.css";

interface ButtonProps {
    /**
     * Is this the principal call to action on the page?
     */
    primary?: boolean;
    /**
     * What background color to use
     */
    backgroundColor?: string;
    /**
     * How large should the button be?
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Button contents
     */
    label: string;
    /**
     * Optional click handler
     */
    onClick?: () => void;
}


export default function ButtonWithLoader({
     primary = false,
     size = 'medium',
     backgroundColor,
     label,
     ...props
 }: ButtonProps) {

    return (
        <button className="btn-primary">testing</button>
    )
}