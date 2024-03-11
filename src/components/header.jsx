import { Outlet, Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../Context";


export default ( {loguejat, setLoguejat, handleLogOut} ) => {

  return (
    <>
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
                {!loguejat && (
                  <Link className="text-white" to="/register">
                    {" "}
                    Register
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
    </>
  );
};
