import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteItem, getItem } from '../services/ItemsAPI.js';
import Customizer from '../components/Customizer.jsx';
import PriceBadge from '../components/PriceBadge.jsx';

export default function ItemDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [item, setItem] = useState(null);
  useEffect(() => { (async ()=> setItem(await getItem(id)))(); }, [id]);
  if (!item) return <p>Loading…</p>;

  const onDelete = async () => { if (confirm('Delete this item?')) { await deleteItem(id); nav('/'); } };

  return (
    <div style={{display:'grid', gap:16}}>
      <h2>{item.name}</h2>
      <Customizer {...item} />
      <PriceBadge total={item.total_price} />
      <div><small>{item.color}/{item.sole}/{item.laces}/{item.logo}</small></div>
      <div style={{display:'flex', gap:12}}>
        <Link to={`/items/${id}/edit`}>Edit</Link>
        <button onClick={onDelete}>Delete</button>
        <Link to="/">Back</Link>
      </div>
    </div>
  );
}
