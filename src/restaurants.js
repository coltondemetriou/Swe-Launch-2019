import React from 'react';
import './App.css';
import axios from 'axios';
import styled from "styled-components";

const API_KEY = process.env.REACT_APP_API_KEY;

const mapResults = restaurants => {
    return restaurants.map(restaurant => 
    <li> {restaurant.name} {restaurant.rating} {restaurant.price_level}</li>);
}

export default class Restaurants extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            restaurants : [],
        };
    }
    async componentDidMount(){
        let url = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Charlottesville&key="
        + API_KEY;
        axios.get(url)
        .then(res=>{
            const data = res.data.results;
            const openr = [];
            for(let i=0; i<data.length; i++){
                if(data[i].opening_hours.open_now == true){
                    openr.push(data[i]);
                }
            }
            this.setState({
                restaurants : openr
            });
           });
    }
    
    render(){
        return (
            <div>
                <h1>
                    Restaurants
                </h1>
                {this.state.restaurants!==null && mapResults(this.state.restaurants)}
            </div>
          );
    }
}