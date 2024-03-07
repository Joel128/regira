import {
    createItem,
    updateItem,
    deleteItem,
    readItem,
    readItems,
  } from "../controllers/generics.controllers.js";

  import issuesControllers from "../controllers/issues.controllers.js";
  const { getIssuesByUser } = issuesControllers;
  import { Router } from "express";
  const router = Router();
  
  import checkToken from "./checkToken.js";
  import Issues from "../models/issues.js";
  
  export default router
    .get("/issues", checkToken, async (req, res) => await readItems(req, res, Issues))
    .get("/issues/:id", checkToken, async (req, res) => await readItem(req, res,Issues))
    .post("/issues", checkToken, async (req, res) => await createItem(req, res,Issues))
    .put("/issues/:id", checkToken, async (req, res) => await updateItem(req, res,Issues))
    .get("/issues/user/:id", checkToken, async (req, res) => await getIssuesByUser(req, res,Issues))
    .delete("/issues/:id", checkToken, async (req, res) => await deleteItem(req, res,Issues));
  