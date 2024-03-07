// tag.js
import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Issues = (await import("./issues.js")).default;


const Tag = sequelize.define("tag", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Tag.belongsToMany(Issues, { through: 'tagissues' });

export default Tag;
