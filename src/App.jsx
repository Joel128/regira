import "./App.css";

import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Context from "./Context";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

import Header from "./components/header.jsx";

function App() {
  const API_URL = "http://localhost:3000/api";
  const token = Cookie.get("token");
  const redirect = useNavigate();

  useEffect(() => {
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const data = {
        ...payload,
        token: token,
      };
      if (!data.error) {
        console.log(data);
        setLoguejat(data);
      }
    } else {
      setLoguejat(false);
      redirect("/login");
    }
  }, [token]);

  const [loguejat, setLoguejat] = useState(null);
  const dades = { loguejat, setLoguejat };

  const handleLogOut = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setLoguejat(null);
    window.location.href = "/login";
  };

  return (
    <>
      <Context.Provider value={dades}>
        <Header
          loguejat={loguejat}
          setLoguejat={setLoguejat}
          handleLogOut={handleLogOut}
        ></Header>
        <div className=" p-10">{loguejat !== null && <Outlet />}</div>
      </Context.Provider>
    </>
  );
}

export default App;
