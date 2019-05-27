const axios = require('axios');
const express = require('express');
const app = express();
const port = 5000

const API_KEY = process.env.REACT_APP_API_KEY

app.get('/', function(req, res, next) {
    res.send('API is working');
});

app.get('/:cuisine', function(req, res, next) {
    let url = "https://cors-anywhere-hclaunch.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + req.params.cuisine +  "+in+Charlottesville&key="
        + API_KEY;
    axios.get(url)
    .then(respone =>{
        res.send(respone.data.results);
    }).catch(err => console.log(err));

    /*
    const ans = books[req.params.title];
    res.send(ans);
    */
});



app.get('/getGeocode:address', (req,res)=>{
    //access google api with req.params.address
    //axios.get(google api url).then(
      //  res.send(response from google)
    //)
})
app.listen(port, () => console.log('Listening on port ' + port));

module.exports = app;