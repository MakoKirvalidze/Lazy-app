import React, { useState, useEffect } from 'react';

interface DataItem {
  id: number;
  value: string;
}

const HeavyComponent: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const generatedData: DataItem[] = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        value: Math.random().toString(36).substring(7)
      }));
      setData(generatedData);
    };

    loadData();
  }, []);

  return (
    <div>
      <h2>Fruits</h2>
      <p>Loading items</p>
      <ul>
        {data.slice(0, 10).map(item => (
          <li key={item.id}>{item.value}</li>
        ))}
      </ul>
      {data.length > 10 && <p>...and {data.length - 10} more items</p>}
    </div>
  );
};

export default HeavyComponent;