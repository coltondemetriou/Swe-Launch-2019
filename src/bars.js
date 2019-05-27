import React from 'react';
import axios from 'axios';
import LeafletApp from './LeafletMap.js';
import "./style.css";
import LeafletMap from './LeafletMap.js';

const API_KEY = process.env.REACT_APP_API_KEY

export default class Bars extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bars : [],
            restaurants : [],
            r : [],
        };
    }
    componentWillMount(){
        let url = "https://cors-anywhere-hclaunch.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=bars+in+Charlottesville&key="
        + API_KEY;
        axios.get(url)
        .then(res=>{
            const data = res.data.results;
            const bars = [];
            for(let i=0; i<data.length; i++){
                if(data[i].opening_hours.open_now == true){
                    bars.push(data[i]);
                }
            }
            this.setState({
                bars : bars,
                restaurants: this.props.restaurants

            });
            console.log(this.state.restaurants);
           });
    }

    
    render(){
        if (this.state.restaurants.length != 0 && this.state.bars.length != 0) {
            var callMap = <LeafletMap restaurants={ this.state.restaurants } bars={ this.state.bars } />
            var Search = <searchbar restaurants={ this.state.restaurants } bars={ this.state.bars } />
          } else {
            var callMap = null;
            var Search = null;
          }
        return (
            <div className = "App">
            <div className="SubTitle"> Bars </div>
            <div className= "Style">
                    {this.state.bars.map(bar=>(
                        <li><div className="Name">{bar.name}</div> <div className="Space">Price: {bar.price_level}</div> <div className="Space">
                        Rating: {bar.rating}</div></li>   
                    ))}  
                    </div>  
                    {callMap}
                    {Search}
            </div>
          );
    }
}