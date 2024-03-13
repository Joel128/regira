import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../Context";
import Cookie from "js-cookie";


const URL = "http://localhost:3000/api";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirect = useNavigate();

  const { loguejat, setLoguejat } = useContext(Context);

  useEffect(() => {
    if (loguejat) {
      console.log(loguejat);

      redirect("/projects");
    }
  }, []);
  const login = (e) => {
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
        const token = Cookie.get("token");
        const payload = JSON.parse(atob(token.split(".")[1]));

        data = {
          ...payload,
          token: token,
        };
        if (!data.error) {
          console.log(data);
          setLoguejat(data);
          navigate("/projects");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full max-w-xs m-auto">
      <br />
      <br />

      <form
        onSubmit={login}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h1 className="text-center">Login</h1>
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
            type="text"
            placeholder="Username"
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
            className="shadow appearance-none border
            rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
        </div>
        <div className="text-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};
