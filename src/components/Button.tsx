import React from "react";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import {AiFillHeart, AiOutlineClose, AiOutlineHeart, AiOutlineShoppingCart,} from "react-icons/ai";

interface BtnProperties {
    children?: string;
    iconName?: "heart" | "cart" | "close" | "emptyHeart";
    size?: "sm" | "lg";
    isFilled?: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    hidden?: boolean;
}

export const Btn = ({
                        type,
                        children,
                        iconName,
                        size = "lg",
                        isFilled = "btnFilled",
                        onClick,
                        hidden = false,
                    }: BtnProperties) => {
    let content: any;
    if (children) {
        content = children;
    } else {
        switch (iconName) {
            case "cart": {
                content = <AiOutlineShoppingCart/>;
                break;
            }
            case "heart": {
                content = <AiFillHeart/>;
                break;
            }
            case "close": {
                content = <AiOutlineClose/>;
                break;
            }
            case "emptyHeart": {
                content = <AiOutlineHeart/>;
                break;
            }
            default: {
                <AiFillHeart/>;
                break;
            }
        }
    }

    return (
        <Button
            hidden={hidden}
            size={size}
            className={isFilled}
            onClick={onClick}
            type={type}
        >
            {content}
        </Button>
    );
};
