import { pool } from './database.js';

const SQL = `
CREATE TABLE IF NOT EXISTS custom_items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT NOT NULL,        -- e.g., "red" | "blue" | "black" | "white"
  sole TEXT NOT NULL,         -- "standard" | "sport" | "chunky"
  laces TEXT NOT NULL,        -- "white" | "black" | "glow"
  logo TEXT NOT NULL,         -- "classic" | "stealth" | "bold"
  total_price INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- seed one record for demo
INSERT INTO custom_items (name, color, sole, laces, logo, total_price)
VALUES ('My First Sneaker', 'red', 'standard', 'white', 'classic', 85)
ON CONFLICT DO NOTHING;
`;

(async () => {
  try {
    await pool.query(SQL);
    console.log('✅ Tables created & seed inserted (if empty).');
    process.exit(0);
  } catch (e) {
    console.error('❌ Reset failed:', e);
    process.exit(1);
  }
})();
