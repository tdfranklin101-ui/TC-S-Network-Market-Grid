'use client';
import { useEffect, useState } from 'react';

interface MarketItem {
  object_id: string;
  title: string;
  description: string;
  rays_value: number;
  solar_value: number;
}

export default function MarketList() {
  const [items, setItems] = useState<MarketItem[]>([]);

  useEffect(() => {
    fetch('/api/import')
      .then(r => r.json())
      .then(data => setItems(data.items || []));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map(item => (
        <div key={item.object_id} className="p-4 bg-black/50 border border-yellow-300 rounded-lg">
          <h3 className="text-xl font-bold text-yellow-200">{item.title}</h3>
          <p className="text-gray-300">{item.description}</p>

          <p className="pt-2 text-yellow-400">
            {item.rays_value} Rays  
            <span className="text-gray-400"> ({item.solar_value.toFixed(4)} Solar)</span>
          </p>
        </div>
      ))}
    </div>
  );
}
