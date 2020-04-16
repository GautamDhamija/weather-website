const axios =require('axios')
const path= require('path')
const express= require('express')
const hbs=require('hbs')
const geoCode=require('./utils/geocode')
const forecast=require('./utils/forecast')


var name='Gautam'

const app=express()

//Define Paths for Experss Config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsDirectoryPath=path.join(__dirname,'../templates/views')
const partialsDirectoryPath=path.join(__dirname,'../templates/partials')


//Setup handlebars Engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

//setup static engine to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'WEATHER',
        name,
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'HELP',
        name,
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'ABOUT',
        name,
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address)
    {
        return res.send({
            error:'You must provide Address string'
        })
    }
    console.log(req.query.address)
    const {address}=req.query
    console.log(address)

    geoCode(address,(error,response)=>{
        if (error)
        return res.send({error})

        forecast(response.longitude,response.latitude, (error,data)=>{
            if(error)
            return res.send({error})

            res.send({
                address:response.place,
                temp:data
            })
        })
    })

    // res.send({
    //     forecast:27,
    //     location: req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You Must Provide the Search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'Help Error',
        errorMessage:'Help Page Not Found',
        name:'Gautam'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'Error 404',
        errorMessage:'Page Not Found',
        name:'Gautam'
    })

})


app.listen(3000,()=>{
    console.log('Server is up on port 3000')    
})