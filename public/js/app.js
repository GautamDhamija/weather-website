const weatherForm = document.querySelector('form')
const search =document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent='From javascript'
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location =search.value
messageOne.textContent='Loading......'

fetch('/weather?address='+location)
.then(response=>{   
    response.json().then((data)=>{
        if (data.error)
        return messageTwo.textContent=data.error
        console.log(data)
        messageOne.textContent=data.address
        messageTwo.textContent='The temp is : '+data.temp.temp+' but it feels like '+data.temp.feels_like+'.The Dew point is: '+data.temp.dew_point+' .General Description : '+data.temp.weatherDescription
        
    })
})
})