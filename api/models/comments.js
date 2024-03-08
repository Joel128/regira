// tag.js
import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

import Issues from "./issues.js";
import Users from "./users.js";

const Comments = sequelize.define("comments", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Comments.belongsTo(Issues, { foreignKey: "issue_id", sourceKey: "id" });
Comments.belongsTo(Users, { foreignKey: "user_id", sourceKey: "id" });

export default Comments;
