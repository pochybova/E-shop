import {LoggedUser, Product} from "./Product";
import "../styles.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {FilterEnum} from "../shared/FilterEnum";
import {Modes} from "../pages/ProfilePage";
// import imgg from "../images/product1";

const productsSet = [
    {
        id: 1,
        name: "reading lamp",
        price: 19.99,
        imageSrc: require("../images/product9.png"),
    },
    {
        id: 2,
        name: "work lamp",
        price: 12.99,
        imageSrc: require("../images/product2.png"),
    },
    {
        id: 3,
        name: "desk lamp",
        price: 4,
        imageSrc: require("../images/product3.png"),
    },
    {
        id: 4,
        name: "reading lamp",
        price: 15,
        imageSrc: require("../images/product4.png"),
    },
    {
        id: 5,
        name: "reading lamp",
        price: 19.99,
        imageSrc: require("../images/product5.png"),
    },
    {
        id: 6,
        name: "reading lamp",
        price: 12.99,
        imageSrc: require("../images/product6.png"),
    },
    {
        id: 7,
        name: "reading lamp",
        price: 4,
        imageSrc: require("../images/product7.png"),
    },
    {
        id: 8,
        name: "reading lamp",
        price: 15,
        imageSrc: require("../images/product8.png"),
    },
];

interface FilterProp {
    filter?: string;
    search?: string;
    mode?: string;
}

export const Products = ({filter, search, mode}: FilterProp) => {

    var loggedUser: LoggedUser | undefined;
    const stored = sessionStorage.getItem('userEmail');
    const usersString = localStorage.getItem("users");
    if (usersString) {
        const users: Array<LoggedUser> = JSON.parse(usersString);
        loggedUser = users.find(
            (user) => stored === user.email
        );
    }

    return (
        <Row className="mx-auto">
            {productsSet.sort((a, b) => {
                    switch (filter) {
                        case FilterEnum.NAME:
                            return a.name.localeCompare(b.name);
                        case FilterEnum.LOWEST_TO_HIGHEST:
                            return a.price - b.price;
                        case FilterEnum.HIGHEST_TO_LOWEST:
                            return b.price - a.price;
                        default:
                            return 0;
                    }
                }
            ).filter(product => {
                if (mode === Modes.CART) {
                    return product.name.includes(search!) && loggedUser!.cart.includes(product.id);
                } else if (mode === Modes.FAVORITES) {
                    return product.name.includes(search!) && loggedUser!.favorites.includes(product.id);
                }
                return product.name.includes(search!)
            }).map(product => (
                <Col
                    key={product.id}
                    sm={{span: 12}}
                    lg={{span: 4}}
                    md={{span: 6}}
                >
                    <Product
                        id={product.id}
                        imageSrc={product.imageSrc}
                        name={product.name}
                        price={product.price}
                    />
                </Col>
            ))}
        </Row>
    );
};
