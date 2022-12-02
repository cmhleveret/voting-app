import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Form } from "react-bootstrap";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import { validSignupInputs } from "./validSignupInputs.js"

const Signup = ({ client }) => {
  const navigate = useNavigate();

  const initialFormState = {
    username: "",
    password: "",
    passwordConfirmation: "",
  };

  const [formValues, changeFormValues] = useState(initialFormState);

  const handleChange = (event) => {
    event.preventDefault();
    const newState = { ...formValues };
    newState[event.target.name] = event.target.value;
    changeFormValues(newState);
  };

  const signupHandler = (event) => {
    event.preventDefault();
    if (validSignupInputs(formValues)) {
      client.signup(formValues).then(
        ({ data }) => {
          client.changeToken(data.token);
          client.changeUserId(data.userid);
          changeFormValues(initialFormState);
          navigate("/");
        }
      );
    } else {
      toastr["error"]("Check input fields for errors.", "Invalid Signup");
    }
  };

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            name="username"
            type="text"
            value={formValues.username}
            onChange={(event) => handleChange(event)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            name="password"
            type="password"
            value={formValues.password}
            onChange={(event) => handleChange(event)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            required
            name="passwordConfirmation"
            type="password"
            value={formValues.passwordConfirmation}
            onChange={(event) => handleChange(event)}
          />
        </Form.Group>
        <Button
        className = "loginButtons"
          variant="primary"
          type="submit"
          onClick={(event) => {
            signupHandler(event);
          }}
        >
          Sign up
        </Button>
      </Form>
      <Button className = "loginButtons" variant="primary" onClick={() => navigate("/")}>
        Back to Login
      </Button>
    </>
  );
};

export default Signup;
