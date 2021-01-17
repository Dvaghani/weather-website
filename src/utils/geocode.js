const request = require('request')
const geoCode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidmFnaGFuaTEyMyIsImEiOiJja2pudXVsM3UwMzVuMnNvNWhmamphbXRpIn0.LksGh-X26Ochv7-PkPND2Q&limit=1'
    request({url,json:true},(error,{body})=>{
       if(error){
          callback('Unable to connect mapbox API!',undefined)
       }else if(body.features.length==0){
          callback('invalid location',undefined)
       }else{
          callback(undefined,{
             latitude :body.features[0].center[1],
             longitude:body.features[0].center[0],
            location: body.features[0].place_name
          })
       }
 
    })
 }

 module.exports = geoCode