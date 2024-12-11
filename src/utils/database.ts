import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  host: process.env.HOST,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  dialect: "mysql",
  port: 3306,
  define: {
    charset: "utf8",
    collate: "utf8_general_ci",
  },
});

export const dbConfig = async () => {
  try {
    await sequelize.sync();
    console.log("Connection has been established successfully");
  } catch (err) {
    console.log("Unable to connect to database:", err);
  }
};
