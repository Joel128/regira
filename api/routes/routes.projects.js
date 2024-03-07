import {
    createItem,
    updateItem,
    deleteItem,
    readItem,
    readItems,
  } from "../controllers/generics.controllers.js";
  import { Router } from "express";
  const router = Router();
  
  import checkToken from "./checkToken.js";
  import Projects from "../models/projects.js";
  
  export default router
    .get("/projects", checkToken, async (req, res) => await readItems(req, res, Projects))
    .get("/projects/:id", checkToken, async (req, res) => await readItem(req, res, Projects))
    .post("/projects", checkToken, async (req, res) => await createItem(req, res, Projects))
    .put("/projects/:id", checkToken, async (req, res) => await updateItem(req, res, Projects))
    .delete("/projects/:id", checkToken, async (req, res) => await deleteItem(req, res, Projects));
  