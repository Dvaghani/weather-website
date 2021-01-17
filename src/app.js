const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const app = express()
const port = process.env.PORT || 3000

const viewpath = path.join(__dirname,'../template/views')
const partialpath = path.join(__dirname,'../template/partials')
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)
const publicDirectoryPath = path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Dhruvit'
    }) 
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Dhruvit'
    }) 
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        description: 'this is help page',
        name:'Dhruvit'
    }) 
})
app.get('/help/*',(req,res)=>{
    res.render('404page',{
        title:'404',
        description: 'Help article not found'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'you must provide address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude, (error, forecastdata) => {
           if(error){
            return res.send({
                error 
            })
           }
           res.send({
               forecast : forecastdata,
               location,
               address: req.query.address
            })
        //    console.log(location)
        //    console.log(forecastdata)
         })
     })
})
app.get('*',(req,res)=>{
    res.render('404page',{
        title:'404',
        description:'404 page not found'
    })
})



app.listen(port,()=>{
    console.log('Server Started at localhost:'+port)
})