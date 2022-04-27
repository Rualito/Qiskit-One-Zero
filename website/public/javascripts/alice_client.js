
// var http = require('http').Server(router);
const io = require('socket.io-client');
// const socket = io.connect(ipAddr);
const socket = io.connect('/');


function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

var ucode = getCookie('ucode')
var jcode = getCookie('jcode')

socket.on('connect', ()=>{
    socket.emit('join alice', [ucode, jcode])
})

socket.on("get key", (basis_data)=>{
    bbits = basis_data[0]
    match = basis_data[1]    

    key = ''
    for(let i=0; i<match.length; i++){
        if(match[i]){
            key += bbits[i]
        } else {
            key += '_'
        }
    }

    document.getElementById('key-bits').innerHTML = key
})


basis_denom = ['C', 'D']
c_bits = ['0', '1']
d_bits = ['+', '-']

function alice_send() {
    let basis_str = document.getElementById("select-basis").value
    let bits_str = document.getElementById("send-bits").value
    
    if(!(basis_str.length == bits_str.length)){
        return;
    }
    
    let send_str = ''
    let should_send = true
    for(let i=0; i<basis_str.length; i++) {
        if(!['0', '1'].includes(bits_str.charAt(i))){
            should_send = false
            break
        }
        if(basis_str.charAt(i) == basis_denom[0]){
            send_str += c_bits[ Math.round(bits_str.charAt(i)) ]
        } else {
            send_str += d_bits[ Math.floor(bits_str.charAt(i)) ]
        }   
    }

    if ( should_send){
        // doesn't do anything if lengths are different
        // var xmlHttp = new XMLHttpRequest();
        socket.emit("send qubit", [basis_str, bits_str, jcode])

        // xmlHttp.onreadystatechange = function() {
        //     if (xmlHttp.readyState == 4 && xmlHttp.status==200) {
        //         // if successful request -> confirm that bits are sent
                
        //         console.log(`Alice:\n\tBasis: ${basis_str}, Bits: ${bits_str}`)
        //         let sent_text = document.getElementById('sent-bits')
        //         sent_text.innerHTML = send_str
        //     }
        // }

        // xmlHttp.open("GET", "alice/data/?basis="+basis_str+"&?bits="+bits_str)
        // xmlHttp.send(null)
    }
}
