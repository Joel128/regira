import {Outlet, Link} from "react-router-dom";
import "./App.css";

function App() {


  const handleLogOut = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
  };

  return <>
    <div className="">
      <h1>Regira</h1>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/newIssue">New Issue</Link>
          </li>
          <li>
            <Link to="/issueList">Issue List</Link>
          </li>
          <li>
            <button onClick={handleLogOut}>Log out</button>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  </>;
}

export default App;
