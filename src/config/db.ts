import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const createDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    console.log(`Database ${DB_NAME} is ready.`);
  } catch (error) {
    console.error('Unable to create database:', error);
    process.exit(1);
  }
};

const connectToDatabase = async () => {
  await createDatabase();

  const sequelize = new Sequelize(DB_NAME as string, DB_USER as string, DB_PASSWORD as string, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: false,
  });

  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }

  return sequelize;
};

export default connectToDatabase();
