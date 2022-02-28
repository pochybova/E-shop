import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Btn} from "./Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import "../styles.css";
import {useNavigate} from "react-router-dom";

interface ProductProperties {
    id: number;
    name?: string;
    price?: number;
    imageSrc: string;
}

export interface LoggedUser {
    email: string;
    password: string;
    favorites: Array<number>;
    cart: Array<number>;
}

export enum FavoriteEnumeration {
    BTN_FILLED = "btnFilled position-absolute top-0 end-0",
    BTN_EMPTY = "btnEmpty position-absolute top-0 end-0",
}

export const Product = ({id, name, price, imageSrc}: ProductProperties) => {
    let navigate = useNavigate();
    const [favoriteTest, setFavoriteTest] = useState(isFilledFavorites);

    let favorite = isFilledFavorites();

    const [logged, isLoggedUser] = useState(
        getSessionStorageOrDefault("isLogged", false)
    );

    function getSessionStorageOrDefault(
        key: string,
        defaultValue: boolean
    ): boolean {
        const stored = sessionStorage.getItem(key);
        if (!stored) {
            return defaultValue;
        }
        return JSON.parse(stored);
    }

    function isFilledFavorites(): boolean {
        const usersString = localStorage.getItem("users");
        if (usersString) {
            const users: Array<LoggedUser> = JSON.parse(usersString);
            const user = users.find(
                (user) => sessionStorage.getItem("userEmail") === user.email
            );
            if (user?.favorites.includes(id)) {
                return true;
            }
        }
        return false;
    }

    function addToFavorites(): void {
        const usersString = localStorage.getItem("users");
        if (usersString) {
            const users: Array<LoggedUser> = JSON.parse(usersString);
            const userIndex = users.findIndex(
                (user) => sessionStorage.getItem("userEmail") === user.email
            );
            const user = users[userIndex];
            if (user?.favorites.includes(id)) {
                user.favorites.splice(
                    user.favorites.findIndex((value) => value === id),
                    1
                );
            } else {
                if (user?.favorites) user.favorites.push(id);
            }
            users[userIndex] = user;
            localStorage.setItem("users", JSON.stringify(users));
        }
    }

    function addToCart(): void {
        const usersString = localStorage.getItem("users");
        if (usersString) {
            const users: Array<LoggedUser> = JSON.parse(usersString);
            const userIndex = users.findIndex(
                (user) => sessionStorage.getItem("userEmail") === user.email
            );
            const user = users[userIndex];
            console.log(user.cart);
            if (user.cart.includes(id)) {
                user.cart.splice(
                    user.cart.findIndex((value) => value === id),
                    1
                );
            } else {
                if (user.cart) user.cart.push(id);
            }
            users[userIndex] = user;
            localStorage.setItem("users", JSON.stringify(users));
        }
    }

    function Favorite() {
        return (
            <Btn
                hidden={!logged}
                iconName="heart"
                size="sm"
                isFilled={
                    favoriteTest
                        ? FavoriteEnumeration.BTN_FILLED
                        : FavoriteEnumeration.BTN_EMPTY
                }
                onClick={() => {
                    addToFavorites();
                    setFavoriteTest(!favoriteTest);
                }}
            />
        );
    }

    return (
        <Card className="card-component">
            <img src={imageSrc} alt="" width="100%" className="card-img-top"/>
            <Favorite/>
            <Container>
                <Row>
                    <div className="btn card-body">
                        <Btn
                            hidden={!logged}
                            iconName="cart"
                            size="lg"
                            isFilled="btnEmpty position-absolute bottom-0 end-0"
                            onClick={() => {
                                addToCart();
                            }}
                        />
                        <Col lg={12} sm={12}>
                            <Row className="card-title">{name}</Row>
                            <Row className="card-text">Price: {price} €</Row>
                        </Col>
                    </div>
                </Row>
            </Container>
        </Card>
    );
};
