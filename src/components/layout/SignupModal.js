import React, { useState, useContext } from "react";

import { AuthContext } from "../../shared/context/auth-context";

import { useForm } from "../../shared/hooks/form-hook";

import { useHttpClient } from "../../shared/hooks/http-hook";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/validators";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ErrorModal from "../shared/ErrorModal";
import Spinner from "react-bootstrap/Spinner";

export default function SignupModal(props) {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formCheck, setFormCheck] = useState(false);

  const [formState, formInputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      confirmPassword: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const signupHandler = async (e) => {
    e.preventDefault();
    const isPasswordSame =
      formState.inputs.confirmPassword.isValid &&
      formState.inputs.password.isValid &&
      formState.inputs.confirmPassword.value !==
        formState.inputs.password.value;
    if (!formState.isValid || isPasswordSame) {
      setFormCheck(true);
      return;
    }
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL+"/users/signup",
        "POST",
        JSON.stringify({
          username: formState.inputs.username.value,
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
          <Modal.Title id="contained-modal-title-vcenter">Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={signupHandler}>
            <Form.Group className="my-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                className={`form-input ${
                  !formState.inputs.username.isValid && formCheck
                    ? "is-invalid"
                    : ""
                }`}
                value={formState.inputs.username.value}
                onChange={(e) =>
                  formInputHandler("username", e.target.value, [
                    VALIDATOR_REQUIRE(),
                  ])
                }
              />
              {!formState.inputs.username.isValid && formCheck && (
                <Form.Text className="text-danger">
                  Username can not be empty.
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
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

            <Form.Group className="mb-3" controlId="formBasicPassword">
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

            <Form.Group className="mb-5" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                className={`form-input ${
                  !formState.inputs.confirmPassword.isValid && formCheck
                    ? "is-invalid"
                    : ``
                }`}
                value={formState.inputs.confirmPassword.value}
                onChange={(e) =>
                  formInputHandler("confirmPassword", e.target.value, [
                    VALIDATOR_REQUIRE(),
                    VALIDATOR_MINLENGTH(8),
                  ])
                }
              />
              {!formState.inputs.confirmPassword.isValid && formCheck && (
                <Form.Text className="text-danger">
                  Minimum length of password is 8 characters.
                </Form.Text>
              )}
              {formState.inputs.confirmPassword.isValid &&
                formState.inputs.password.isValid &&
                formState.inputs.confirmPassword.value !==
                  formState.inputs.password.value && (
                  <Form.Text className="text-danger">
                    Passwords are not the same.
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
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
