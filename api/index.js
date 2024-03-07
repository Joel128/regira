// index.js
//Middlewares

import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import sequelize from "./database/database.js";

// Controllers

import controllers_users from "./controllers/user.controllers.js";

// Routes
import routes_users from "./routes/routes.user.js";
import routes_issues from "./routes/routes.issues.js";
import routes_projects from "./routes/routes.projects.js";
import routes_tag from "./routes/routes.tag.js";
import routes_comments from "./routes/routes.comments.js";


// Models
import Projects from "./models/projects.js";
import Users from "./models/users.js";
import Issues from "./models/issues.js";
import Comments from "./models/comments.js";
import Tag from "./models/tag.js";


const app = express();

const PORT = 3000;

async function iniDB() {
  try {
    // Middlewares
    app.use(cors({ origin: "http://localhost:5173", credentials: true }));
    app.use(express.json());
    app.use(cookieParser());
    app.use((err, req, res, next) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });

    // Rutas
    app.use('/api',routes_users);
    app.use('/api',routes_issues);
    app.use('/api',routes_tag);
    app.use('/api',routes_comments);
    app.use('/api',routes_projects);

    // Abrir puerto
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Sincronizar la base de datos
    await sequelize.sync();
  } catch (error) {
    console.error("Error syncing database:", error);
  }
}

iniDB();
