import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";

import { useForm } from "../../shared/hooks/form-hook";
import { jwtDecode } from "jwt-decode";

import { useHttpClient } from "../../shared/hooks/http-hook";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import ErrorModal from "../../components/shared/ErrorModal";
import "./AdminLogin.css";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/validators";

export default function AdminLogin() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formCheck, setFormCheck] = useState(false);

  const [isAdminError, setIsAdminError] = useState();

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

  const clearAdminError = () => {
    setIsAdminError(null);
  };

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

      if (!jwtDecode(responseData.token).isAdmin) {
        setIsAdminError("You are not admin, please login as admin.");
        return;
      }

      auth.login(responseData.userId, responseData.token, responseData.image);
      navigate("/admin/ManagePosts");
    } catch (err) {}
  };
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <ErrorModal error={isAdminError} onClear={clearAdminError} />
      <div className="admin-login-form">
        <Form onSubmit={loginHandler} className="w-100">
          <h1 className=" mb-5">Admin Login</h1>
          <Form.Group className="my-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              className={`form-input ${
                !formState.inputs.email.isValid && formCheck ? "is-invalid" : ""
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
        </Form>
      </div>
    </>
  );
}
