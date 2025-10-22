import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ItemList from './pages/ItemList.jsx'
import ItemCreate from './pages/ItemCreate.jsx'
import ItemDetail from './pages/ItemDetail.jsx'
import ItemEdit from './pages/ItemEdit.jsx'

export default function App() {
  return (
    <div style={{maxWidth: 960, margin: '0 auto', padding: 24}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <Link to="/" style={{textDecoration:'none'}}><h1>👟 Sneaker Personalizer</h1></Link>
        <Link to="/create">Create</Link>
      </header>

      <Routes>
        <Route path="/" element={<ItemList/>}/>
        <Route path="/create" element={<ItemCreate/>}/>
        <Route path="/items/:id" element={<ItemDetail/>}/>
        <Route path="/items/:id/edit" element={<ItemEdit/>}/>
      </Routes>
    </div>
  )
}
