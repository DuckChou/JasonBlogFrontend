import React, { useState, useContext } from "react";

import { AuthContext } from "../../shared/context/auth-context";

import { useForm } from "../../shared/hooks/form-hook";

import { useHttpClient } from "../../shared/hooks/http-hook";

import GoogleButton from "react-google-button";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ErrorModal from "../shared/ErrorModal";
import Spinner from "react-bootstrap/Spinner";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/validators";

export default function LoginModal(props) {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formCheck, setFormCheck] = useState(false);

  const [formState, formInputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const loginHandler = async (e) => {
    e.preventDefault();
    if (!formState.isValid) {
      setFormCheck(true);
      return;
    }
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/users/login",
        "POST",
        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      props.onHide();
      auth.login(responseData.userId, responseData.token, responseData.image);
    } catch (err) {}
  };

  const googleLoginHandler = async () => {
    try {
      window.open(
        process.env.REACT_APP_BACKEND_URL + "/users/googleLogin",
        "_self"
      );
      // auth.login(responseData.userId, responseData.token, responseData.image);
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={loginHandler}>
            <Form.Group className="my-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                className={`form-input ${
                  !formState.inputs.email.isValid && formCheck
                    ? "is-invalid"
                    : ""
                }`}
                value={formState.inputs.email.value}
                onChange={(e) =>
                  formInputHandler("email", e.target.value, [
                    VALIDATOR_REQUIRE(),
                    VALIDATOR_EMAIL(),
                  ])
                }
              />
              {!formState.inputs.email.isValid && formCheck && (
                <Form.Text className="text-danger">
                  Email is invalid, please check your email address.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-5" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                className={`form-input ${
                  !formState.inputs.password.isValid && formCheck
                    ? "is-invalid"
                    : ""
                }`}
                value={formState.inputs.password.value}
                onChange={(e) =>
                  formInputHandler("password", e.target.value, [
                    VALIDATOR_REQUIRE(),
                    VALIDATOR_MINLENGTH(8),
                  ])
                }
              />
              {!formState.inputs.password.isValid && formCheck && (
                <Form.Text className="text-danger">
                  Minimum length of password is 8 characters.
                </Form.Text>
              )}
            </Form.Group>

            {!isLoading && <Button type="submit">Submit</Button>}
            {isLoading && (
              <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="md"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Loading...
              </Button>
            )}
            <hr />
            <div className="d-flex justify-content-center">
              <GoogleButton onClick={googleLoginHandler} />
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
