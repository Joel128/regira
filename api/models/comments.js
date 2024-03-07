// tag.js
import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Issues = (await import("./issues.js")).default;
const Users = (await import("./users.js")).default;

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
