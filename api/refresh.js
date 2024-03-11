import express from "express";
import checkToken from "./routes/checkToken.js";
import User from "./models/users.js";

const router = express.Router(); // Crear una instancia de Router

router.get("/refresh", checkToken, async (req, res) => {
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

export default router;
