
const io = require('socket.io-client');
// const socket = io.connect(ipAddr);
const socket = io.connect('http://10.14.45.25:8080');

var local_code = Math.floor(Math.random() * 10000)


document.cookie = `ucode=${local_code}`

socket.on('connect', ()=>{

    socket.emit('add user', local_code)
})

document.addEventListener("DOMContentLoaded", ()=>{
    var el = document.getElementById("usercode")
    el.innerHTML = local_code

})


socket.on("redirect", (url)=>{
    window.location = url
})

socket.on('join cookie', (jcode) => {
    document.cookie += `;jcode=${ccode}`
})


function connect_alice_bob(){
    // var xmlHttp = new XMLHttpRequest();

    // let myCode = document.getElementById('usercode').innerHTML
    let friendCode = document.getElementById("friendcode").value


    // xmlHttp.onreadystatechange = () => {
    //     if()
    // }

    socket.emit('join codes', [local_code, friendCode])
    // xmlHttp.open("GET", `connect/?myCode=${myCode}&?friendCode=${friendCode}`)
    // xmlHttp.send(null)

}

socket.on('connect', () => {
    console.log("Successfully connected")
})