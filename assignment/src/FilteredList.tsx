import React, { useMemo } from 'react';

interface FilteredListProps {
  filterText: string;
}

const FilteredList: React.FC<FilteredListProps> = ({ filterText }) => {
  const items = useMemo(() => [
    'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry',
    'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon',
    'Mango', 'Nectarine', 'Orange', 'Papaya', 'Quince'
  ], []);

  const filteredItems = useMemo(() => 
    items.filter(item =>
      item.toLowerCase().includes(filterText.toLowerCase())
    ),
    [items, filterText]
  );

  return (
    <div>
      <h3>Filtered Fruits List</h3>
      {filteredItems.length === 0 ? (
        <p>No matching fruits found.</p>
      ) : (
        <ul>
          {filteredItems.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilteredList;