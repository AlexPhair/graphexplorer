import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './components/Home';
import './App.css';
import { Container } from 'reactstrap';
import SearchResults from './components/search/SearchResults';
import ViewEntity from './components/ViewEntity';

function App() {
  return (
    <React.Fragment>
      <Header />
      <Container className='pt-4'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/search" element={<SearchResults/>}/>
          <Route path="/view/:wikidataId" element={<ViewEntity/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Container>
    </React.Fragment>
  );
}

export default App;
