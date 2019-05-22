import React from 'react';
import './App.css';
import Restaurants from "./restaurants.js";
import Bars from "./bars.js";
import styled from "styled-components";
import Searchbar from "./searchbar.js";


function App() {
  const Style = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: tomato;
  `;
  const Style2 = styled.h1`
font-size: 1em;
text-align: left;
background: papayawhip;
`; 


  return (
    <div className="App">
    <Style>
    <h1>
      Charlottesville Restaurants and Bars
    </h1>
    </Style>
    <Style2>
      <Restaurants />
      <Bars />
      </Style2>
    </div>
  );
}

export default App;
