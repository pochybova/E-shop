import React, { useState } from "react";
import { Btn } from "./Button";
import "../styles.css";
/*import Container from "react-bootstrap/Container";*/
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface SIFormProperties {
  toShow: boolean;
  onClose: () => void;
}

interface LoggedUser {
  email: string;
  password: string;
  favorites: Array<number>;
  cart: Array<number>;
}

export const users: Array<LoggedUser> = [
  {
    email: "a@a.a",
    password: "Aa@12345678",
    favorites: [],
    cart: [],
  },
  {
    email: "b@b.b",
    password: "Aa@12345678",
    favorites: [],
    cart: [],
  },
];

if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(users));
}

export const SIForm = ({ toShow, onClose }: SIFormProperties) => {
  const [show, setShow] = useState(toShow);
  console.log(toShow);

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleEmailChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmailInput(e.target.value);
  };

  const handlePasswordChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPasswordInput(e.target.value);
  };

  let navigate = useNavigate();

  const handleLoginSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(`test only`);

    let isLogged = false;
    const loggedUser = users.find(
      (user) => user.email === emailInput && user.password === passwordInput
    );

    if (!!loggedUser) {
      console.log(`test i am logged now `);

      //combination is good. Log them in.
      //this token can be anything. You can use random.org to generate a random string;
      // sessionStorage.setItem("auth-email", email);
      sessionStorage.setItem("isLogged", "true");
      sessionStorage.setItem("userEmail", loggedUser.email);
      let path = `profile`;
      navigate(path);
    } else {
      //bad combination
      alert("wrong email or password combination");
    }
  };

  return (
    <Modal show={toShow}>
      <Modal.Dialog>
        <Modal.Title>
          <Row>
            <p className="title">Sign In</p>
          </Row>
        </Modal.Title>
        <Modal.Header>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form autoComplete="off" onSubmit={handleLoginSubmit}>
            <Col md={8}>
              {/* <Row>
          <Col md={{ span: 2, offset: 10 }}>
            <Btn iconName="close" size="sm" isFilled="btnEmpty" />
          </Col>
        </Row> */}
              <Row>
                <input
                  type="email"
                  onChange={handleEmailChange}
                  title="Zadajte validny email"
                  pattern="(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|'(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*')@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])"
                  required
                />
              </Row>
              <Row>
                <input
                  title="Heslo musi obsahovat velke pismeno, male pismeno, aspon 1 cislo, aspon 1 symbol (#,@,$) a musi byt min. 8 znakov dlhe"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$*?&])[A-Za-z\d#@$*?&]{8,}$"
                  type={"password"}
                  required
                  placeholder="password"
                  onChange={handlePasswordChange}
                />
              </Row>
              <Row>
                <div>
                  <Btn isFilled="btnFilled" type={"submit"}>
                    Sign In
                  </Btn>
                </div>
              </Row>
            </Col>
          </Form>
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
  );
};
