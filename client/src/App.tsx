import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Listings from './pages/Listings';
import PrivateRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/listing' element={ <PrivateRoute> <Listings /> </PrivateRoute> } />
      </Routes>
    </Router>
  )
}

export default App