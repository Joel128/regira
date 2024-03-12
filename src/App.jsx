import "./App.css";

import { Outlet, Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Context from "./Context";
import Cookie from "js-cookie";

import Header from "./components/header.jsx";

function App() {
  const API_URL = "http://localhost:3000/api";
  const cookie = Cookie.get("token")


  const [loguejat, setLoguejat] = useState(null);
  const dades = { loguejat, setLoguejat };
  
  const handleLogOut = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setLoguejat(null);
    window.location.href = "/login";
  };

  console.log(cookie);

  useEffect(() => {
    if (cookie) {
      fetch(API_URL + "/refresh", { credentials: "include" })
        .then((e) => e.json())
        .then((data) => {
          if (data.error) {
            handleLogOut();
          } else {
            console.log(data);
            setLoguejat(data);
          }
        });
    }
  }, []);

  return (
    <>
      <Context.Provider value={dades}>
        <Header
          loguejat={loguejat}
          setLoguejat={setLoguejat}
          handleLogOut={handleLogOut}
        ></Header>
        <div className=" p-10">
          <Outlet />
        </div>
      </Context.Provider>
    </>
  );
}

export default App;
