import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Map } from './components/Map';
import { ActionsBar } from './components/ActionsBar';


function App() {
  return (
    <div className="App">
      <ActionsBar/>
      <Map/>
    </div>
  );
}

export default App;
