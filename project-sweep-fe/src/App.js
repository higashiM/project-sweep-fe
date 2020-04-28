import React from 'react';
import './App.css';
import Header from './components/Header';
import UnsortedItemList from './components/UnsortedItemList';

function App() {
  return (
    <div className="App">
      <Header />
      <UnsortedItemList />
    </div>
  );
}

export default App;
