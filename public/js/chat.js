

const socket=io()


// socket.on(`countUpdated`,(count)=>{
//     console.log('the count has been updated',count)
// })

// document.querySelector('#increment').addEventListener('click',()=>{
//     console.log('clicked')
//     socket.emit('increment')
// }
// )

socket.on('message',(message)=>{
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit',(e)=>{
    // preventing page from refrwshing when button clicked
    e.preventDefault()
    // const message=document.querySelector('input').value;
    const message=e.target.elements.message.value;
    socket.emit('sendMessage',message)
})

document.querySelector('#send-location').addEventListener('click',()=>{
    
    if(!navigator.geolocation){
        return alert('geolocation is not supported by your browser')
    }

    navigator.geolocation.getCurrentPosition((position)=>{
        // console.log(position)
        socket.emit('sendLocation',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        })
    })
})