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
    <div>
      <h1>Signup</h1>
      <form method='POST' onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/>
        <br />
        <label>Email</label>
        <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
        <br />
        <label>Password</label>
        <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
        <br />
        <input type="submit" value="Signup"/>
      </form>
    </div>
  )
}

export default Signup
