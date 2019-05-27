import React from 'react';
import axios from 'axios';
import "./style.css";
import LeafletMap from './LeafletMap.js';
import Flexbox from 'flexbox-react';
import {Table} from "antd";

const API_KEY = process.env.REACT_APP_API_KEY

const columns = [{
    
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Rating',
        dataIndex: 'rating',
        key: 'rating',
      },
]

export default class Places extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            restaurants : [],
            cuisine : 'restaurant',
            dataSource : [],
        };
    }
    handleChange = event =>{
        this.setState({
            cuisine: event.target.value,
        })
    }
    handleClick = event =>{
        this.componentDidMount();
    }
    componentDidMount(){
        let url = "https://cors-anywhere-hclaunch.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + this.state.cuisine +  "+in+Charlottesville&key="
        + API_KEY;
        axios.get(url)
        .then(res=>{
            const data = res.data.results;
            const restaurants = [];
            const tableData = [];
        try{
            for(let i=0; i<data.length; i++){
                if(data[i].opening_hours.open_now == true){
                    restaurants.push(data[i]);
                    tableData.push({
                        key : i.toString,
                        name : data[i].name,
                        price : data[i].price_level,
                        rating : data[i].rating,
                    });
                }
            }
        }
        catch(e){
            console.log('error', e)

        }
            this.setState({
                restaurants : restaurants,
                result : data,
                dataSource : tableData,
            });
            console.log(restaurants);
           });
        
    }
    
    render(){
        if (this.state.restaurants.length != 0 ) {
            var callMap = <LeafletMap restaurants={ this.state.restaurants } />
          } else {
            var callMap = null;
          }
        return (
            <div className = "App">
            <input type="text" id="filter" placeholder="Search for food..."  onChange={this.handleChange}/>
            <input type = "submit" onClick={this.handleClick}/>
            <Table dataSource={this.state.dataSource} columns={columns} />; 
            {callMap}
            </div>
          );
    }
}


