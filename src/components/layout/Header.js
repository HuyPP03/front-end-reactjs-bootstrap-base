import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userNotExist } from "../../redux/action/actions";
import { Link } from "react-router-dom";
const Header = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.user.isLoading);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLogout = (e) => {
    e.preventDefault();
    try {
      axios
        .get("http://localhost:8080/logout", {
          withCredentials: true,
        })
        .then((res) => {
          setShow(false);
          dispatch(userNotExist());
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary bg-light">
      <Container className="header_container">
        <Navbar.Brand href="#home">Base_React</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {isLoading ? (
            <></>
          ) : (
            <>
              {user ? (
                <>
                  <Nav className="">
                    <Nav.Link href="#">Home</Nav.Link>
                    <Nav.Link href="#">Link</Nav.Link>
                    <NavDropdown title={user.name} id="basic-nav-dropdown">
                      <NavDropdown.Item>Action</NavDropdown.Item>
                      <NavDropdown.Item href="#">
                        <div onClick={handleShow}>Đăng xuất</div>

                        <Modal
                          show={show}
                          onHide={handleClose}
                          backdrop="static"
                          keyboard={false}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Đăng xuất</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>Bạn có muốn đăng xuất không?</Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Hủy
                            </Button>
                            <Button variant="danger" onClick={handleLogout}>
                              Đăng xuất
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </>
              ) : (
                <>
                  <div className="d-flex gap-3 pr-6">
                    <Link to="/register">
                      <Button variant="primary">Đăng ký</Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="danger">Đăng nhập</Button>
                    </Link>
                  </div>
                </>
              )}
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
