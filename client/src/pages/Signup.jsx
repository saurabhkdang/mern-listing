import React, { useState } from 'react'

const Signup = () => {

  const [formData, setFormData] = useState({name: '', email: '', password: ''});

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        if(data.error) {
          alert(`Signup error: ${data.error}`);
          return;
        }
        console.log(data);
        alert('User created successfully');
        setFormData({name: '', email: '', password: ''});
      })
    } catch (error) {
      console.log('Signup failed:', error);
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-md'>

        <h1 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Signup</h1>
        <form method='POST' onSubmit={handleSubmit}>
          <label>Name</label>
          <input className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/>
          <br />
          <label>Email</label>
          <input className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
          <br />
          <label>Password</label>
          <input className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
          <br />
          <input className='w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition' type="submit" value="Signup"/>
        </form>
      </div>
    </div>
  )
}

export default Signup
