import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllItems, deleteItem } from '../services/ItemsAPI.js';

export default function ItemList() {
 const [items, setItems] = useState([]);
const [err, setErr] = useState('');
 async function load() {
  try {
    const data = await getAllItems();
    setItems(Array.isArray(data) ? data : []);
    setErr(Array.isArray(data) ? '' : 'Failed to load items.');
  } catch (e) {
    setErr('Failed to load items.');
    setItems([]);
  }
}
useEffect(() => { load(); }, []);
  const onDelete = async id => { if (confirm('Delete this item?')) { await deleteItem(id); load(); } };

  return (
    <div>
      <h2>Created Items</h2>
      {err && <div style={{color:'#b00020'}}>{err}</div>}
      {items.length === 0 && <p>No items yet. <Link to="/create">Create one</Link>.</p>}
      <ul style={{listStyle:'none', padding:0, display:'grid', gap:12}}>
        {items.map(it => (
          <li key={it.id} style={{border:'1px solid #eee', padding:12, borderRadius:12}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <strong>{it.name}</strong> — ${it.total_price}<br/>
                <small>{it.color}/{it.sole}/{it.laces}/{it.logo}</small>
              </div>
              <div style={{display:'flex', gap:8}}>
                <Link to={`/items/${it.id}`}>View</Link>
                <Link to={`/items/${it.id}/edit`}>Edit</Link>
                <button onClick={() => onDelete(it.id)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
