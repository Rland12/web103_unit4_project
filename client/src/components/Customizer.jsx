import React from 'react';

const COLOR = { red:'#e03a3a', blue:'#2a67e0', black:'#222', white:'#f5f5f5' };

export default function Customizer({ color, sole, laces, logo }) {
  const base = COLOR[color];
  const soleHeight = sole === 'chunky' ? 16 : sole === 'sport' ? 12 : 8;
  const laceGlow = laces === 'glow' ? '0 0 10px rgba(255,255,150,.9)' : 'none';
  const logoText = logo === 'stealth' ? 'S' : logo === 'bold' ? 'B' : 'C';

  return (
    <div style={{ border:'1px solid #eee', borderRadius:16, padding:16, width:'100%', maxWidth:420 }}>
      <div style={{ position:'relative', height:140, background: base, borderRadius:20 }}>
        <div style={{
          position:'absolute', top:16, right:16, width:28, height:28, borderRadius:'50%',
          background: logo === 'stealth' ? '#999' : '#fff', border:'2px solid #000',
          display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'bold'
        }}>{logoText}</div>

        <div style={{
          position:'absolute', top:60, left:40, right:40, height:6, borderRadius:6,
          background: laces === 'black' ? '#000' : '#fff', boxShadow: laceGlow
        }} />

        <div style={{
          position:'absolute', bottom:-soleHeight/2, left:8, right:8, height:soleHeight,
          borderRadius:8, background:'#eaeaea', border:'1px solid #bbb'
        }} />
      </div>
    </div>
  );
}
