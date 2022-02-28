import React, {useState} from "react";
import "../styles.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import {Inp} from "../components/Input";
import {Products} from "../components/Products";
import LoginDialog from "../components/LoginDialog";
import "./ProductsPage.css";
import {SIForm} from "../components/SignInFormular";

export const ProductsPage = () => {
    const [visibility, setVisibility] = useState(false);
    const [toShow, setToShow] = useState(<p></p>);
    const [sortFilter, setSort] = useState('');
    const [searchString, setSearch] = useState('');
    const popupCloseHandler = (
        e: boolean | ((prevState: boolean) => boolean)
    ) => {
        setVisibility(e);
    };
    const [show, setShow] = useState<boolean>(false);

    return (
        <Container fluid="lg" className="page-block">
            <Row>
                <p className="title" >E-Shop</p>
            </Row>
            <SIForm toShow={show} onClose={() => setShow(false)}/>
            <Row>
                <Col>
                    <button
                        className="btn btn-primary button-login"
                        onClick={() => {
                            setVisibility(true);
                            console.log("xxx");
                            setShow(true);
                        }}
                    >
                        Log in
                    </button>
                    <LoginDialog onClose={popupCloseHandler} show={visibility}/>
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
                <Products filter={sortFilter} search={searchString}/>
            </Row>
        </Container>
    );
};
