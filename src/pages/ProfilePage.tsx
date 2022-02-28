import React, {useState} from "react";
import {Btn} from "../components/Button";
import "../styles.css";
import {Navb} from "../components/Navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import {Inp} from "../components/Input";
import {Products} from "../components/Products";
import {useNavigate} from "react-router-dom";
import "./ProfilePage.css";

const loggededUser = sessionStorage.getItem("loggedUser");

export enum Modes {
    CART = 'cart',
    FAVORITES = 'bookmark'
}

interface ProfileProps {
    mode?: string;
}

export const ProfilePage = ({mode}: ProfileProps) => {
    let navigate = useNavigate();
    const [sortFilter, setSort] = useState('');
    const [searchString, setSearch] = useState('');

    function getSessionStorageOrDefault(
        key: string,
        defaultValue: boolean
    ): boolean {
        const stored = sessionStorage.getItem(key);
        if (!stored) {
            navigate("/");
            return defaultValue;
        }

        return JSON.parse(stored);
    }

    const [logged, isLoggedUser] = useState(
        getSessionStorageOrDefault("isLogged", false)
    );

    const clearStorage = () => {
        sessionStorage.clear();
        navigate("/");
    };

    if (!loggededUser) {
    }
    return (
        <Container fluid="lg" className="page-block">
            <Row>
                <p className="title">E-Shop</p>
            </Row>
            <Row>
                <Col>
                    <Btn isFilled="logout-button btnFilled float-end" onClick={clearStorage}>
                        Logout
                    </Btn>
                </Col>
            </Row>
            <Row>
                <Col lg={4}>
                    <Navb/>
                </Col>
            </Row>
            <Row className="mx-auto">
                <Col lg={4}>
                    <Inp type="text" onChange={event => setSearch(event.target.value)} size="sm"/>
                </Col>
                <Col lg={4}>
                    <Form.Select aria-label="Sort" onChange={event => setSort(event.target.value)} placeholder="Sort"
                                 size="sm">
                        <option>Sort</option>
                        <option value="name">Sort by name</option>
                        <option value="lowest">Sort by price: from the lowest</option>
                        <option value="highest">Sort by price: from the highest</option>
                    </Form.Select>
                </Col>
            </Row>
            <Row>
                <Products filter={sortFilter} search={searchString} mode={mode}/>
            </Row>
        </Container>
    );
};
