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

  useEffect(() => {
    if (!loguejat) {
      redirect("/login");
    }
  }, [loguejat]);
console.log("dades:::::::",loguejat);
  const options = {
    method: "GET",
    credentials: "include",
  };
  useEffect(() => {
    fetch(`${URL}/projects/user/${loguejat.userId}`, options)
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
      <ul className="grid grid-cols-3 gap-4">
        {projects.map((project) => (
          <li key={project.id}>
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <div className=" px-6 py-4">
                <div className="font-bold text-xl mb-2">{project.name}</div>
                <p className="text-gray-700 text-base">
                  Project Description: {project.desc}
                </p>
                <p className="text-gray-700 text-base">
                  Projects Status: {project.status === 1 ? "Open" : "Closed"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 px-6 pt-4 pb-2">
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              See issues
            </button>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Create issues
            </button>
            </div>
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
};
