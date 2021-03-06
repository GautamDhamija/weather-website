const axios= require('axios')
const forecast= (longitude,latitide,callback)=>{
    const key='22ed6ecd1c2f781a7ad450b7af01b5aa'
    //url=https://api.openweathermap.org/data/2.5/onecall?lat=30.34&lon=76.379997&units=metric&appid=22ed6ecd1c2f781a7ad450b7af01b5aa
    const url='https://api.openweathermap.org/data/2.5/onecall?lat='+latitide+'&lon='+longitude+'&units=metric&appid='+key
    axios.get(url).then((response)=>{
        
            callback(undefined,{
                temp:response.data.current.temp,
                dew_point: response.data.current.dew_point,
                feels_like: response.data.current.feels_like,
                weatherDescription: response.data.current.weather[0].description
            })

      
    }).catch((error)=>{
        if(error.response)
        {
            callback({
                cod:error.response.data.cod,
                message: error.response.data.message,
            },undefined)

        }
        else{
            callback('Low Level OS Error',undefined)
        }
            
    })

}

module.exports = forecast