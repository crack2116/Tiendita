import React from 'react';

export default function CategoryChips({ categories, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(cat => (
        <button key={cat} onClick={() => onChange(cat)} className={`px-3 py-1.5 rounded-full border ${active===cat ? 'border-brand ring-2 ring-brand/30' : 'border-border'} bg-panel`}>
          {cat[0].toUpperCase()+cat.slice(1)}
        </button>
      ))}
    </div>
  );
}


