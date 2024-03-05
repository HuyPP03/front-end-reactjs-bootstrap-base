import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { checkUserLogin, userNotExist } from "./redux/action/actions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:8080/token", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.errCode === 0) dispatch(checkUserLogin(res.data.id));
        else dispatch(userNotExist());
      })
      .catch((err) => console.log(err));
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
