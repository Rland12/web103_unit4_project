import React from 'react';
export default function PriceBadge({ total }) {
  return (
    <div style={{display:'inline-block',padding:'6px 10px',borderRadius:999,border:'1px solid #ddd',fontWeight:'bold'}}>
      Total: ${total}
    </div>
  );
}
