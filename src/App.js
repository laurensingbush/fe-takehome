import React, { useState, useEffect } from 'react';
import { useFilter } from './hooks/useFilter';
import './styles/main.scss';
import SearchBar from './components/SearchBar';
import Table from './components/Table';

function App() {
  const [originalData, setOriginalData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [listId, setListId] = useState('');
  const [filteredData] = useFilter({ searchValue, listId, originalData });

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const res = await fetch('https://fetch-hiring.s3.amazonaws.com/hiring.json', {signal: abortController.signal});
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        } else {
          const resJSON = await res.json();

          // remove items with null or blank name property & sort by listId and name
          let filterSortItems = resJSON.filter((item) => item.name !== null  && item.name !== '');
          filterSortItems.sort((a, b) => a.listId === b.listId ? a.name.slice(5) - b.name.slice(5) : a.listId > b.listId ? 1 : -1);
          
          setOriginalData(filterSortItems);
        }
      } catch(error) {
        if (abortController.signal.aborted) {
          console.log('Request aborted.')
        } else {
          console.error(error);
        }
      }
    }

    fetchData();

    return () => {
      // cancel fetch request
      abortController.abort();
    }
    
  }, []);

  return (
    <div className="App">
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <Table listId={listId} setListId={setListId} filteredData={filteredData} />
    </div>
  );
}

export default App;
