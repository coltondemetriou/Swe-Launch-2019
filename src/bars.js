import React from 'react';
import './App.css';
import axios from 'axios';
import styled from "styled-components";

const API_KEY = process.env.REACT_APP_API_KEY;

const mapResults = bars => {
    return bars.map(bar => 
    <li> {bar.name} {bar.rating} {bar.price_level}</li>);
}
export default class Bars extends React.Component{ 

    constructor(props){
        super(props);
        this.state = {
            bars : [],
        };
    }
    async componentDidMount(){
        let url = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=bars+in+Charlottesville&key="
        + API_KEY;
        axios.get(url)
        .then(res=>{
            const data = res.data.results;
            const openb = [];
            for(let i=0; i<data.length; i++){
                if(data[i].opening_hours.open_now == true){
                    openb.push(data[i]);
                }
            }
            this.setState({
                bars : openb
            });
           });
    }
    
    render(){
        return (
            <div>
                <h1>
                    Bars
                </h1>
                {this.state.bars!==null && mapResults(this.state.bars)}
            </div>
          );
    }
}