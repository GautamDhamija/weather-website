axios=require('axios')

const geoCode = (address,callback)=>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?limit=1&access_token=pk.eyJ1IjoiZ2F1dGFtMTc1NCIsImEiOiJjazh3MHRtOTcwZTV3M3Vuejg0cDMzaHVkIn0.kYzK2mkLKXNNbjZnnnMEuA'
    
    axios.get(url).then((response)=>{
        if(response.data.features.length==0)
        callback('No such place found on map!',response)
        else
        callback(undefined,{
            longitude : response.data.features[0].center[0],
            latitude : response.data.features[0].center[1],
            place : response.data.features[0].place_name
        })
    
    }).catch((error)=>{
        callback('Low Level OS Error '+error.message)
    })
    
    }

module.exports = geoCode
    