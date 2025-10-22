const API = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export async function getAllItems() {
  const r = await fetch(`${API}/items`);
  return r.json();
}
export async function getItem(id) {
  const r = await fetch(`${API}/items/${id}`);
  return r.json();
}

export async function createItem(body) {
  const r = await fetch(`${API}/items`, {
    method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body)
  });
  return r.json();
}

export async function updateItem(id, body) {
  const r = await fetch(`${API}/items/${id}`, {
    method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body)
  });
  return r.json();
}

export async function deleteItem(id) {
  const r = await fetch(`${API}/items/${id}`, { method: 'DELETE' });
  return r.json();
}

