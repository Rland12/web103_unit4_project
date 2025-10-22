import { pool } from '../config/database.js';
import { validateImpossibleCombo } from '../utils/validateCombos.js';

// simple price list
const PRICE = {
  base: 70,
  color: { red: 5, blue: 5, black: 10, white: 0 },
  sole: { standard: 10, sport: 20, chunky: 30 },
  laces: { white: 0, black: 5, glow: 15 },
  logo: { classic: 0, stealth: 5, bold: 10 }
};

function calcTotal({ color, sole, laces, logo }) {
  return (
    PRICE.base +
    (PRICE.color[color] ?? 0) +
    (PRICE.sole[sole] ?? 0) +
    (PRICE.laces[laces] ?? 0) +
    (PRICE.logo[logo] ?? 0)
  );
}

export async function getAllItems(req, res) {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM custom_items ORDER BY created_at DESC;'
    );
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch items.' });
  }
}

export async function getItem(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      'SELECT * FROM custom_items WHERE id=$1;',
      [id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch item.' });
  }
}

export async function createItem(req, res) {
  try {
    const { name, color, sole, laces, logo } = req.body;

    const err = validateImpossibleCombo({ color, sole, laces, logo });
    if (err) return res.status(400).json({ error: err });

    const total = calcTotal({ color, sole, laces, logo });
    const { rows } = await pool.query(
      `INSERT INTO custom_items (name, color, sole, laces, logo, total_price)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *;`,
      [name, color, sole, laces, logo, total]
    );
    res.status(201).json(rows[0]);
  } catch (e) {
    res.status(500).json({ error: 'Failed to create item.' });
  }
}

export async function updateItem(req, res) {
  try {
    const { id } = req.params;
    const { name, color, sole, laces, logo } = req.body;

    const err = validateImpossibleCombo({ color, sole, laces, logo });
    if (err) return res.status(400).json({ error: err });

    const total = calcTotal({ color, sole, laces, logo });
    const { rows } = await pool.query(
      `UPDATE custom_items
       SET name=$1, color=$2, sole=$3, laces=$4, logo=$5, total_price=$6, updated_at=NOW()
       WHERE id=$7 RETURNING *;`,
      [name, color, sole, laces, logo, total, id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ error: 'Failed to update item.' });
  }
}

export async function deleteItem(req, res) {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query(
      'DELETE FROM custom_items WHERE id=$1;',
      [id]
    );
    if (!rowCount) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'Failed to delete item.' });
  }
}
