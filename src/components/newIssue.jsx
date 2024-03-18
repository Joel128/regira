import { useState, useContext, useEffect } from "react";
import Cookie from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import Contexte from "../Context";


const API_URL = "http://localhost:3000/api";

export default () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [issue_type, setIssue_type] = useState("");
  const [priority, setPriority] = useState("");
  const redirect = useNavigate();
  const { loguejat } = useContext(Contexte);
  const { id } = useParams();
  console.log(loguejat);

  const creaIssue = (e) => {
    e.preventDefault();
    console.log();
    const issue = { title, desc,issue_type, priority };

    const options = {
      method: "POST",
      body: JSON.stringify(issue),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(id);
    fetch(API_URL + "/issue/" + id, options)
      .then((res) => res.json())
      .then((data) => {
        //console.log("resp", data);
        redirect("/projectDetail/" + id);
      })
      .catch((cosa) => console.log(cosa));
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={creaIssue} className="bg-white px-8 pt-6 pb-8 mb-4">
        <h1 className="">Nova isssue</h1>
        <br />

        <hr />
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Titol
          </label>
          <input
            onInput={(e) => setTitle(e.target.value)}
            value={title}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Nom"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Desc
          </label>
          <textarea
            onInput={(e) => setDesc(e.target.value)}
            value={desc}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Nom"
          />
        </div>

        <div className="border p-4 bg-blue-200 m-4">
          <div className="radio">
            <label>
              <input
                type="radio"
                value="bug"
                name="issue_type"
                checked={issue_type === "bug"}
                onChange={() => setIssue_type("bug")}
              />
              Bug
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="feature"
                name="issue_type"
                checked={issue_type === "feature"}
                onChange={() => setIssue_type("feature")}
              />
              User story / Feature
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="task"
                name="issue_type"
                checked={issue_type === "task"}
                onChange={() => setIssue_type("task")}
              />
              Task
            </label>
          </div>
        </div>

        <div className="border p-4 bg-red-200 m-4">
          <div className="radio">
            <label>
              <input
                type="radio"
                value="high"
                name="priority"
                checked={priority === "high"}
                onChange={() => setPriority("high")}
              />
              High
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="medium"
                name="priority"
                checked={priority === "medium"}
                onChange={() => setPriority("medium")}
              />
              Medium
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="low"
                name="priority"
                checked={priority === "low"}
                onChange={() => setPriority("low")}
              />
              Low
            </label>
          </div>
        </div>

        <br />
        <br />

        <div>
          <br />

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Desar
          </button>
        </div>
      </form>
    </div>
  );
};
