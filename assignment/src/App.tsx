import React, { useState, useTransition, lazy, Suspense, useId } from 'react';


const HeavyComponent = lazy(() => import('./HeavyComponent'));


const EmailForm: React.FC = () => {
  const id = useId();
  return (
    <form>
      <label htmlFor={`${id}-email`}>Email:</label>
      <input id={`${id}-email`} type="email" required />
      <button type="submit">Submit</button>
    </form>
  );
};


const App: React.FC = () => {
  const [showHeavy, setShowHeavy] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string>('');
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    setShowHeavy(true);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setFilterText(e.target.value);
    });
  };

  return (
    <div>
      

      <button onClick={handleClick}>Loading button</button>

      {showHeavy && (
        <Suspense fallback={<div>Loading...</div>}>
          <HeavyComponent />
        </Suspense>
      )}

      <h2>Choose</h2>
      <input
        type="text"
        value={filterText}
        onChange={handleFilterChange}
        placeholder="Filter items..."
      />
      {isPending ? (
        <div>Updating list...</div>
      ) : (
        <FilteredList filterText={filterText} />
      )}

      <h2> Your Email</h2>
      <EmailForm />
      
    </div>
  );
};


interface FilteredListProps {
  filterText: string;
}

const FilteredList: React.FC<FilteredListProps> = ({ filterText }) => {
  const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

export default App;