import { Sequelize } from "sequelize";

const sequelize = new Sequelize("regira", "root", "admin", {
  host: "localhost",
  port: "3307",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize ; // Cambiado de `export default sequelize;` a `export { sequelize };`
