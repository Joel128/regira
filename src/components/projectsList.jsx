import { useState } from "react";
import { useEffect, useContext } from "react";
import Contexte from "../Context";

import { useNavigate } from "react-router-dom";

const URL = "http://localhost:3000/api";

export default () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const redirect = useNavigate();
  const { loguejat } = useContext(Contexte);
  console.log(loguejat)

  useEffect(() => {
    if (!loguejat) {
      redirect("/login");
    }
  }, [loguejat]);

  const options = {
    method: "GET",
    credentials: "include",
  };

  useEffect(() => {
    fetch(`${URL}/projects`, options)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                redirect(`/project/${project.id}`);
              }}
            >
              {project.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
