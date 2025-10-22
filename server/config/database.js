import pg from 'pg';

const wantsSSL =
  process.env.PGSSL === 'require' ||
  /render\.com$/i.test(process.env.PGHOST || '');

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
  ssl: wantsSSL ? { rejectUnauthorized: false } : false
};

export const pool = new pg.Pool(config);
