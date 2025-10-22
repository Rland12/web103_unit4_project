import React from 'react';

export default function OptionGroup({ label, options, value, onChange, disabledSet }) {
  return (
    <div style={{marginBottom:12}}>
      <div style={{fontWeight:'bold', marginBottom:6}}>{label}</div>
      <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
        {options.map(opt => {
          const disabled = disabledSet?.has(opt);
          const active = value === opt;
          return (
            <button key={opt} disabled={disabled} onClick={() => onChange(opt)}
              style={{
                padding:'6px 10px', borderRadius:8,
                border: active ? '2px solid #9D41EF' : '1px solid #ccc',
                opacity: disabled ? 0.4 : 1, cursor: disabled ? 'not-allowed' : 'pointer',
                background: active ? '#f6f0ff' : 'white'
              }}>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
