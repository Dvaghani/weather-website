

const weather = document.querySelector('form')
const search = document.querySelector('input')
const msgone = document.querySelector('#msg-1')
const msgtwo = document.querySelector('#msg-2')
weather.addEventListener('submit',(e)=>{
    e.preventDefault()
    const address = search.value
    msgtwo.textContent = ' '
    msgone.textContent = 'Loading ...'
    fetch('http://localhost:3000/weather?address='+address).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msgone.textContent = data.error
        }else{
            msgone.textContent = data.location
            msgtwo.textContent = data.forecast
        }
    })

})

})