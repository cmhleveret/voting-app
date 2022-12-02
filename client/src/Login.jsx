import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const Login = ({ client }) => {
  const navigate = useNavigate();

  const initialFormState = {
    username: "",
    password: "",
  };

  const [formValues, changeFormValues] = useState(initialFormState);

  const validLoginInputs = (formValues) => {
    const { username, password } = formValues;

    if (!username || !password) {
      return false;
    }

    return true;
  };

  const handleChange = (event) => {
    event.preventDefault();
    const newState = { ...formValues };
    newState[event.target.name] = event.target.value;
    changeFormValues(newState);
  };

  const loginHandler = (event) => {
    event.preventDefault();
    if (validLoginInputs(formValues)) {
      client
        .login(formValues)
        .then(({ data }) => {
          client.changeToken(data.token);
          client.changeUserId(data.userid);
          changeFormValues(initialFormState);
        })
        .catch((error) => {
          console.log(error);
          toastr["error"]("Username or password are invalid.", "Invalid Login");
        });
    } else {
      toastr["error"]("Check input fields for errors.", "Invalid Login");
    }
  };

  return (
    <>
      <Container>
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
          <Button className = "loginButtons"
            variant="primary"
            type="submit"
            onClick={(event) => {
              loginHandler(event);
            }}
          >
            Login
          </Button>
        </Form>
        <Button className = "loginButtons" variant="primary" onClick={() => navigate("/newuser")}>
          Sign up!
        </Button>
      </Container>
    </>
  );
};

export default Login;
