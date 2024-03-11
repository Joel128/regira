import {
  createItem,
  updateItem,
  deleteItem,
  readItem,
  readItems,
} from "../controllers/generics.controllers.js";
import { Router } from "express";
const router = Router();

import userControllers from "../controllers/user.controllers.js";

const { login, register } = userControllers;

import checkToken from "./checkToken.js";
import User from "../models/users.js";

export default router
  .get("/users", checkToken, async (req, res) => await readItems(User))
  .get("/users/:id", checkToken, async (req, res) => await readItem(User))
  .post("/login", async (req, res) => await login(req, res, User))
  .post("/register", async (req, res) => await register(req, res, User))
  .put("/users/:id", checkToken, async (req, res) => await updateItem(User))
  .delete("/users/:id", checkToken, async (req, res) => await deleteItem(User))
  .get("/refresh", checkToken, async (req, res) => {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(404).json({ error: "User no trobat" });
      }

      return res.json({ id: user.id, name: user.name });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
