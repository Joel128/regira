import "./App.css";

import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import Context from "./Context";
import Cookies from "js-cookie";

import Header from "./components/header.jsx";
import { useEffect } from "react";

function App() {
  const API_URL = "http://localhost:3000/api";

  const [loguejat, setLoguejat] = useState(null);
  const handleLogOut = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
  };

  useEffect(() => {
    // si tenim una cookie, intentem validar-la!
    if (document.cookie.includes("token")) {
      fetch(API_URL + "/refresh", { credentials: "include" })
        .then((e) => e.json())
        .then((data) => {
          console.log("refresh: ",data);
          if (data.error) {
            // api rebutja la cookie local, l'esborrem per mitjà de la funció logout()
            logout();
          } else {
            // api accepta la cookie, simulem login desant les dades rebudes a "loguejat"
            setLoguejat(data);
          }
        });
    }
  }, []);

  const dades = { loguejat, setLoguejat };
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
