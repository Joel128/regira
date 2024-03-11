import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SECRET_KEY = "mysecretkey";
import User from "../models/users.js";

const login = async (req, res) => {
  const { email, password } = req.body; // Obté l'email i la contrasenya de la petició
  try {
    const user = await User.findOne({ where: { email } }); // Cerca l'usuari pel seu email
    if (!user) {
      return res.status(404).json({ error: "User no trobat" }); // Retorna error 404 si l'usuari no es troba
    }
    const passwordMatch = await bcrypt.compare(password, user.password); // Compara la contrasenya proporcionada amb la contrasenya encriptada de l'usuari
    if (!passwordMatch) {
      return res.status(401).json({ error: "Password incorrecte" }); // Retorna error 401 si la contrasenya és incorrecta
    }
    const token = jwt.sign(
      { userId: user.id, userName: user.name },
      SECRET_KEY,
      { expiresIn: "2h" }
    ); // Genera un token JWT vàlid durant 2 hores
    res.cookie("token", token, { httpOnly: false, maxAge: 7200000 }); // Estableix el token com una cookie
    res.cookie("userId", user.id, { httpOnly: false, maxAge: 7200000 });
    res.json({ message: "Login correcte" }); // Retorna missatge d'èxit
  } catch (error) {
    res.status(500).json({ error: error.message }); // Retorna error 500 amb el missatge d'error
  }
};

const register = async (req, res) => {
  console.log(req.body);
  try {
    let { name, email, password } = req.body; // Obté el nom, email i contrasenya de la petició
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, i password requerits" }); // Retorna error 400 si no es proporcionen el nom, email o contrasenya
    }
    const existingUser = await User.findOne({ where: { email } }); // Comprova si l'email ja està registrat
    if (existingUser) {
      return res.status(400).json({ error: "Email ja existeix" }); // Retorna error 400 si l'email ja està registrat
    }
    password = bcrypt.hashSync(password, 10); // Encripta la contrasenya
    const user = await User.create({ name, email, password }); // Crea l'usuari amb les dades proporcionades
    res.status(201).json(user); // Retorna l'usuari creat amb el codi d'estat 201 (Creat)
  } catch (error) {
    console.log(error);
  }
};

export default { login, register };
