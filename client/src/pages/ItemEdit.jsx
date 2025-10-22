import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getItem, updateItem } from '../services/ItemsAPI.js';
import Customizer from '../components/Customizer.jsx';
import OptionGroup from '../components/OptionGroup.jsx';
import PriceBadge from '../components/PriceBadge.jsx';
import { calcPrice, OPTIONS } from '../utilities/calcPrice.js';
import { impossibleReason, getDisabledOptions } from '../utilities/rules.js';

export default function ItemEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => { (async ()=> setForm(await getItem(id)))(); }, [id]);
  const total = useMemo(() => form ? calcPrice(form) : 0, [form]);
  const disabled = useMemo(() => form ? getDisabledOptions(form) : {}, [form]);
  const reason = useMemo(() => form ? impossibleReason(form) : null, [form]);
  if (!form) return <p>Loading…</p>;

  async function submit() {
    setError('');
    if (reason) return setError(reason);
    const res = await updateItem(id, form);
    if (res?.error) return setError(res.error);
    navigate(`/items/${id}`);
  }

  return (
    <div style={{display:'grid', gap:16}}>
      <h2>Edit Item</h2>
      <Customizer {...form} />
      <PriceBadge total={total} />
      <label style={{display:'grid', gap:6}}>
        <span><b>Name</b></span>
        <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
      </label>
      <OptionGroup label="Color" options={OPTIONS.color} value={form.color} disabledSet={disabled.color} onChange={v=>setForm(f=>({...f,color:v}))}/>
      <OptionGroup label="Sole" options={OPTIONS.sole} value={form.sole} disabledSet={disabled.sole} onChange={v=>setForm(f=>({...f,sole:v}))}/>
      <OptionGroup label="Laces" options={OPTIONS.laces} value={form.laces} disabledSet={disabled.laces} onChange={v=>setForm(f=>({...f,laces:v}))}/>
      <OptionGroup label="Logo" options={OPTIONS.logo} value={form.logo} disabledSet={disabled.logo} onChange={v=>setForm(f=>({...f,logo:v}))}/>
      {reason && <div style={{color:'#b00020'}}><b>Heads up:</b> {reason}</div>}
      {error && <div style={{color:'#b00020'}}><b>Error:</b> {error}</div>}
      <button onClick={submit} style={{padding:'8px 14px', borderRadius:10}}>Update</button>
    </div>
  );
}
