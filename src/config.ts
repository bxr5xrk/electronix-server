import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: process.env.PORT || 5555,
  DB: {
    dbUrl: process.env.DATABASE_URL,
  },
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
};
