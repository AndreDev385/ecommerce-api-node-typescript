import dotenv from 'dotenv'

dotenv.config()

export const config = {
  PORT: process.env.PORT || 4000,
  POSTGRES_URL: process.env.POSTGRES_URL,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
};