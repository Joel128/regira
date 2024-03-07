import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import Issues from "./issues.js";

const Users = sequelize.define("users", {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Users.hasMany(Issues, { foreignKey: "user_id", sourceKey: "id" });
Issues.belongsTo(Users, { foreignKey: "user_id", sourceKey: "id" });

Users.hasMany(Issues, { foreignKey: "author_id", sourceKey: "id" });
Issues.belongsTo(Users, { foreignKey: "author_id", sourceKey: "id" });

export default Users;
