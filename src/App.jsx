import "./App.css";

import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import Context from "./Context";

function App() {
  const [loguejat, setLoguejat] = useState(null);
  const handleLogOut = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
  };

  const dades = { loguejat, setLoguejat };
  console.log(dades);
  return (
    <>
      <Context.Provider value={dades}>
        <nav className="bg-blue-500 p-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <a href="/" className="text-white font-bold text-xl ">
                Regira
              </a>
              <div className="space-x-4">
                {loguejat && (
                  <Link className="text-white" to="/newIssue">
                    Create Issues
                  </Link>
                )}
                {loguejat && (
                  <Link className="text-white" to="/issueList">
                    Your issues
                  </Link>
                )}
                {loguejat && (
                  <Link className="text-white" to="/projects">
                    Your Projects
                  </Link>
                )}
                {!loguejat && (
                  <Link className="text-white" to="/login">
                    {" "}
                    Login
                  </Link>
                )}
                {loguejat && (
                  <Link
                    className="text-white"
                    onClick={handleLogOut}
                    to="/logout"
                  >
                    {" "}
                    Log Out
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
        <div className=" p-10">
          <Outlet />
        </div>
      </Context.Provider>
    </>
  );
}

export default App;
