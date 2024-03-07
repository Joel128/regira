import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
const Users = (await import("./users.js")).default;
const Issues = (await import("./issues.js")).default;
const Projects = sequelize.define("projects", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  active: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
}, {
  timestamps: true, // Mueve esta opción dentro del objeto de opciones
});

Projects.hasMany(Issues, { foreignKey: "project_id", sourceKey: "id" });
Projects.belongsTo(Users, { foreignKey: "user_id", sourceKey: "id" });

export default Projects;
