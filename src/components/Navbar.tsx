import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";

export const Navb = () => {
    return (
        <Nav className="navStyle" fill variant="tabs">
            <Nav.Item>
                <Nav.Link href="/profile">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/profile/favorite">Bookmark</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/profile/cart">Cart</Nav.Link>
            </Nav.Item>
        </Nav>
    );
};
