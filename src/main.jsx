import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// STYLES

import "./App.css";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

//
//  COMPONENTS
//
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import NewIssue from "./components/newIssue.jsx";
import IssueList from "./components/issueList.jsx";
import ProjectsList from "./components/projectsList.jsx";
import Index from "./components/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/newIssue" element={<NewIssue />} />
        <Route path="/issueList" element={<IssueList />} />
        <Route path="/projects" element={<ProjectsList />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
