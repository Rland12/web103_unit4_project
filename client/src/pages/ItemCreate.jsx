import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../services/ItemsAPI.js';
import Customizer from '../components/Customizer.jsx';
import OptionGroup from '../components/OptionGroup.jsx';
import PriceBadge from '../components/PriceBadge.jsx';
import { calcPrice, OPTIONS } from '../utilities/calcPrice.js';
import { impossibleReason, getDisabledOptions } from '../utilities/rules.js';

export default function ItemCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: 'My Sneaker', color: 'red', sole: 'standard', laces: 'white', logo: 'classic' });
  const total = useMemo(() => calcPrice(form), [form]);
  const disabled = useMemo(() => getDisabledOptions(form), [form]);
  const reason = useMemo(() => impossibleReason(form), [form]);
  const [error, setError] = useState('');

  async function submit() {
    setError('');
    if (reason) return setError(reason);
    const res = await createItem(form);
    if (res?.error) return setError(res.error);
    navigate(`/items/${res.id}`);
  }

  return (
    <div style={{display:'grid', gap:16}}>
      <h2>Create Item</h2>
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
      <button onClick={submit} style={{padding:'8px 14px', borderRadius:10}}>Save</button>
    </div>
  );
}
