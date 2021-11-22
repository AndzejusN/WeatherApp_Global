const request = require('request');
// const constants =require('../config');

const constants = {
    openWeatherMap:{
        BASE_URL: 'https://api.openweathermap.org/data/2.5/weather?q=',
        SECRET_KEY: 'eef1a736509553c562e025e8c69d4e6b'
    }
}

const weatherData = (address, callback) =>{
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.SECRET_KEY;
    request({url, json:true},(error,{body}) =>{
       if(error){
           callback("Can't fetch data", undefined);
       }else if(!body.main || !body.main.temp || !body.name || !body.weather){
           callback('Unable to find required data, try another location', undefined);
        }
       else{
           callback(undefined, {
               temperature: body.main.temp,
               description: body.weather[0].description,
               cityName: body.name
           })
       }
    })
}

module.exports = weatherData;
