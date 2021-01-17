const request = require('request')

const foreCast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=7a03d010294516a2b64bd1d25b5d9b18&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect weatherstack API!',undefined)
        }
        else if(body.error){
            callback('invalid location',undefined)
        }
        else{
            callback(undefined,body.current.weather_descriptions+', it is '+ body.current.temperature + ' degree out. it feel like '+body.current.feelslike + ' degree out.\n' + 'pressure is ' + body.current.pressure +'.\n humidity is '+body.current.humidity+'.')
         }
    })
}
module.exports = foreCast