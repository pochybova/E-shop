import React from "react";
import Form from "react-bootstrap/Form";

interface InpProperties {
    placeholder?: string;
    size?: "sm" | "lg";
    type?: "email" | "password" | "text";
    onChange?: (e: any) => void;
}

export const Inp = ({
                        size = "lg",
                        type = "text",
                        placeholder,
                        onChange
                    }: InpProperties) => {
    switch (type) {
        case "email": {
            placeholder = "E-mail";
            break;
        }
        case "password": {
            placeholder = "Password";
            break;
        }
        case "text": {
            placeholder = "Search";
            break;
        }
        default: {
            placeholder = "Search";
            break;
        }
    }
    return (
        <Form.Control
    required
    className="input-size"
    size={size}
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    />
    );
};
