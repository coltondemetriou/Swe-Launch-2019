import React, { Component } from 'react';
import { Map, CircleMarker, Popup, TileLayer } from "react-leaflet";
import axios from 'axios';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
 iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
 iconUrl: require('leaflet/dist/images/marker-icon.png'),
 shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const style = {
  width: "300px",
  height: "300px"
};
const API_KEY = process.env.REACT_APP_API_KEY

export default class LeafletMap extends Component {
    constructor(props){
        super(props);
        console.log(this.props.restaurants);
        this.state = {
            locations : [],
            restaurants : this.props.restaurants,
        };
        
    }

    async componentDidMount(){
      const locations = [];
      for (let i = 0; i< this.state.restaurants.length; i++){
        locations.push(this.state.restaurants[i]);
      }
      this.map = L.map("map", {
        center: [38.0293, -78.4767],
        zoom: 13,
        layers: [L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")]
      });
      for(let j = 0; j<locations.length;j++){
      const mark = L.marker([locations[j].geometry.location.lat,
        locations[j].geometry.location.lng]).addTo(this.map).bindPopup(locations[j].name).openPopup();
      }
      console.log(locations);
      this.setState({locations : locations});

    }
  render() {
    return (
      <div>
        <div className="Map">Map of Charlottesville</div>
        <div id="map" style={{width: "100%", height: "500px" }}/>
      </div>
    );
  }
}
