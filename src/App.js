import React, { Component } from 'react';
import './App.css';
import Quantity from './Quantity';


class App extends Component {
  
  render(){
  return (
    <div className="App"> 
      <div>
        <h2>Quantity Convertor</h2>
      </div>
      <br/>
      <div>
        <Quantity/>
      </div>
    </div>
  );
 }
}

export default App;