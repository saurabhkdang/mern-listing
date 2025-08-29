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
      <div className='flex justify-between items-center mb-4'>
        <input className='w-1/3 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500' type="text" name='search' value={search} onChange={e => setSearch(e.target.value)} placeholder='Search by name or category'/>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full border border-gray-200 shadow-sm rounded-lg'>
          <thead>
            <tr className='bg-gray-100 text-left text-gray-600 font-semibold'>
              <th className='px-4 py-3 border-b'>Name</th>
              <th className='px-4 py-3 border-b'>Category</th>
              <th className='px-4 py-3 border-b'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items && items.map(item => (
              <tr key={item.id} className='hover:bg-gray-50 transition'>
                <td className='px-4 py-3 border-b'>{item.name}</td>
                <td className='px-4 py-3 border-b'>{item.category}</td>
                <td className='px-4 py-3 border-b'>
                  <button className='text-blue-600 hover:underline'>Edit</button>
                  <button className='text-red-600 hover:underline ml-2'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {
        totalpages > 0 && (
          <>
          <div className='flex justify-center mt-6 space-x-2'>
            <button className='px-3 py-2 border rounded-lg bg-white hover:bg-gray-100' onClick={() => setCurrentpage(1)} disabled={currentpage === 1}>First</button>
            <button className='px-3 py-2 border rounded-lg bg-white hover:bg-gray-100' onClick={() => setCurrentpage(currentpage - 1)} disabled={currentpage === 1}>Previous</button>
            <button className='px-3 py-2 border rounded-lg bg-white hover:bg-gray-100' onClick={() => setCurrentpage(currentpage + 1)} disabled={currentpage === totalpages}>Next</button>
            <button className='px-3 py-2 border rounded-lg bg-white hover:bg-gray-100' onClick={() => setCurrentpage(totalpages)} disabled={currentpage === totalpages}>Last</button>
          </div>
          <p>Page {currentpage} of {totalpages}</p>
          </>
        )
      }

    </div>
  )
}


export default Listings
