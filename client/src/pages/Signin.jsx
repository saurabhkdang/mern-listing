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
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} method='POST'>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange}/>
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <button type="submit" onSubmit={handleSubmit}>Sign In</button>
      </form>
    </div>
  )
}

export default Signin