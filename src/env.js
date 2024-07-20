import dotenv from 'dotenv';

export const env = (name, defaultValue) => {
  dotenv.config();
  const value = process.env[name];

  if (value) return value;

  if (defaultValue) return defaultValue;

  throw new Error(`Missing: process.enclev['${name}'].`);
};
