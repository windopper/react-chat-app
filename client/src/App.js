import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Chat from './components/Chat';
import Join from './components/Join';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Join/>} />
      <Route path='/chat' element={<Chat/>} />
    </Routes>
  );
}

export default App;
