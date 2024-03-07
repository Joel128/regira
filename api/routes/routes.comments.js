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
  import Comments from "../models/comments.js";
  
  export default router
    .get("/comments", checkToken, async (req, res) => await readItems(req, res, Comments))
    .get("/comments/:id", checkToken, async (req, res) => await readItem(req, res,Comments))
    .post("/comments", checkToken, async (req, res) => await createItem(req, res,Comments))
    .put("/comments/:id", checkToken, async (req, res) => await updateItem(req, res,Comments))
    .delete("/comments/:id", checkToken, async (req, res) => await deleteItem(req, res,Comments));
  