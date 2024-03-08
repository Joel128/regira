// tag.js
import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

import Issues from "./issues.js";



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
