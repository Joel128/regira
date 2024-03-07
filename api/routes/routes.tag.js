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
  import Tag from "../models/tag.js";
  
  export default router
    .get("/tag", checkToken, async (req, res) => await readItems(req, res, Tag))
    .get("/tag/:id", checkToken, async (req, res) => await readItem(req, res,Tag))
    .post("/tag", checkToken, async (req, res) => await createItem(req, res,Tag))
    .put("/tag/:id", checkToken, async (req, res) => await updateItem(req, res,Tag))
    .delete("/tag/:id", checkToken, async (req, res) => await deleteItem(req, res,Tag));
  