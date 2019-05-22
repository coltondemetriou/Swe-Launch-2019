import React from 'react';
import './App.css';
import axios from 'axios';
import Restaurants from "./restaurants.js";
import Bars from "./bars.js";

export default class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            foodType : ''
        }
    }

}