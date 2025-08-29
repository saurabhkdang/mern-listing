import React, { use, useState } from 'react'
import { useEffect } from 'react'

const Listings = () => {

  const [items, setItems] = useState([]);
  const [totalpages, setTotalpages] = useState(0);
  const [perpage, setPerpage] = useState(5);
  const [currentpage, setCurrentpage] = useState(1);
  const [search, setSearch] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {

    if(token) {
      fetch(`http://localhost:5000/api/items?search=${search}&page=${currentpage}&limit=${perpage}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        if(data.error) {
          location.replace('/');
        }
        setItems(data.items);
        setTotalpages(data.totalPages);
      })
      .catch(error => {
        console.error('Error fetching listings:', error);
      });
    }


  }, [token, search, currentpage]);

  return (
    <div>
      <h1>Listings</h1>
      <input type="text" name='search' value={search} onChange={e => setSearch(e.target.value)} placeholder='Search by name or category'/>
      <ul>
        {items && items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      {
        totalpages > 0 && (
          <>
          <div>
            <button onClick={() => setCurrentpage(1)} disabled={currentpage === 1}>First</button>
            <button onClick={() => setCurrentpage(currentpage - 1)} disabled={currentpage === 1}>Previous</button>
            <button onClick={() => setCurrentpage(currentpage + 1)} disabled={currentpage === totalpages}>Next</button>
            <button onClick={() => setCurrentpage(totalpages)} disabled={currentpage === totalpages}>Last</button>
          </div>
          <p>Page {currentpage} of {totalpages}</p>
          </>
        )
      }

    </div>
  )
}


export default Listings
