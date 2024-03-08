// tag.js
import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Issues = (await import("./issues.js")).default;
const Tag = (await import("./tag.js")).default;

const Tagissues = sequelize.define("tagissues", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
});

Tagissues.hasMany(Issues, { foreignKey: "issue_id", sourceKey: "id" });
Tagissues.belongsTo(Issues, { foreignKey: "issue_id", sourceKey: "id" });

Tagissues.hasMany(Tag, { foreignKey: "tag_id", sourceKey: "id" });
Tagissues.belongsTo(Tag, { foreignKey: "tag_id", sourceKey: "id" });

export default Tagissues;
