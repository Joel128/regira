import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../Context";

export default () => {
  const [projects, setProjects] = useState([]);
  const id = useParams().id;
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
    fetch(`${URL}/projects/${id}`, options)
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
      <h1>{projects.name}</h1>
      <p>{projects.description}</p>
      <p>{projects.issues.length} issues</p>
    </div>
  );
};
