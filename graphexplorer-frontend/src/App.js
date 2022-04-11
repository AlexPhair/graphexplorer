import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './components/Home';
import './App.css';
import { Container } from 'reactstrap';
import SearchResults from './components/search/SearchResults';
import ViewEntity from './components/ViewEntity';
import Utilities from './helpers/Utilities';
import PageNotFound from './components/PageNotFound';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(Utilities.isLoggedIn());

  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(Utilities.isLoggedIn());
  }, [location]);

  return (
    <React.Fragment>
      <Header is_logged_in={isLoggedIn}/>
      <Container className='pt-4'>
        <Routes>
          <Route path="/" element={<Home is_logged_in={isLoggedIn}/>}/>
          <Route path="/search" element={<SearchResults is_logged_in={isLoggedIn}/>}/>
          <Route path="/view/:wikidataId" element={<ViewEntity is_logged_in={isLoggedIn}/>}/>
          <Route path="/register" element={<Register is_logged_in={isLoggedIn}/>}/>
          <Route path="/login" element={<Login is_logged_in={isLoggedIn}/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </Container>
    </React.Fragment>
  );
}

export default App;
