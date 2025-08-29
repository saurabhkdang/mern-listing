import React from 'react'
import { useState } from 'react'

const Signin = () => {

  const [formData, setFormData] = useState({ email: '', password: ''});

  const handleChange = (e) => {
    const { name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json();
      console.log('Signin successful:', data);

      if(res.ok) {
        alert('Signin successful!');
        localStorage.setItem('token', data.token);
        location.href = '/listing';
      }
    } catch (error) {
      console.error('Signin failed:', error);
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-md'>
        <h1 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Sign In</h1>
        <form onSubmit={handleSubmit} method='POST'>
          <label>
            Email:
            <input className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' type="email" name="email" value={formData.email} onChange={handleChange}/>
          </label>
          <label>
            Password:
            <input className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' type="password" name="password" value={formData.password} onChange={handleChange} />
          </label>
          <button className='w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition' type="submit" onSubmit={handleSubmit}>Sign In</button>
        </form>
      </div>
    </div>
  )
}

export default Signin