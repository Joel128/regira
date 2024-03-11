import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
//import { checkToken } from "../../api/routes/checkToken";
import Contexte from "../Context";

const URL = "http://localhost:3000/api";

export default () => {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState("");
  const [cookie, setCookieValue] = useState("");
  const navigate = useNavigate();
  const { loguejat } = useContext(Contexte);

  useEffect(() => {
    if (!loguejat) {
      navigate("/login");
    }
  }, [loguejat]);

  const options = {
    method: "GET",
    credentials: "include",
  };

  useEffect(() => {
    fetch(`${URL}/issues/user/${loguejat.userId}`, options)
      .then((res) => res.json())
      .then((data) => {
        setIssues(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    const token = Cookie.get("cookie");
    console.log(token);
    if (cookie) {
      setCookieValue(token);
    }
  });
  if (error) {
    return <p>{error}</p>;
  }
  console.log(cookie);
  return (
    <div>
      <h1>Issues</h1>
      <ul>
        {issues.map((issues) => (
          <li key={issues.id}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/issue/${issues.id}`);
              }}
            >
              {issues.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
