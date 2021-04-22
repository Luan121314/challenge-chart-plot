import React, { ButtonHTMLAttributes } from "react";
import "./styles.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string,
    name: string
}

const Button: React.FC<ButtonProps> = ({ name, label, ...rest }) => {
    return (
        <button
            id={`button${name}`}
            key={name}
            className="button-component"
            {...rest}
        >{label}</button>
    )
}

export default Button;