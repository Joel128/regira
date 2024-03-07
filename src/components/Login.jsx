import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:3000/api";

export default () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();

    const credencials = {
      email,
      password,
    };

    const options = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credencials),
    };

    fetch(`${URL}/login`, options)
      .then((res) => res.json())
      .then((data) => {
        redirect("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={login}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      />
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          onInput={(e) => setEmail(e.target.value)}
          value={email}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="example@example.com"
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          onInput={(e) => setPassword(e.target.value)}
          value={password}
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign in
        </button>
        <a
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          onClick={alert("Eres tonto o que?")}
        >
          Forgot Password?
        </a>
      </div>
    </div>
  );
};
