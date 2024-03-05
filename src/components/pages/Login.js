import axios from "axios";
import { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkUserLogin } from "../../redux/action/actions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLoginUser = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then(function (response) {
        setMessage(response.data);
        if (response.data.errCode === 0)
          axios
            .get("http://localhost:8080/token", {
              withCredentials: true,
            })
            .then((res) => {
              if (res.data.errCode === 0) {
                dispatch(checkUserLogin(res.data.id));
                navigate("/");
              }
            })
            .catch((err) => console.log(err));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Container className="d-flex vh-100 align-items-center justify-content-center">
      <Form className="w-50" onSubmit={handleLoginUser}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {message.errCode !== 0 && (
          <>
            <span>{message.message}</span>
          </>
        )}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
