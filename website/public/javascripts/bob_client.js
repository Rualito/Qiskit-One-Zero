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
    socket.emit('join bob', [ucode, jcode])
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

function bob_send_basis(){
    let basis_str = document.getElementById('select-basis').value
    // var xmlHttp = new XMLHttpRequest();

    div_recv = document.getElementsByClassName('received-qubits')[0]
            document.getElementsByTagName
    childs = div_recv.childNodes;

    button = childs.getElementsByTagName('button')[0]

    // xmlHttp.onreadystatechange = function (){
    //     if(xmlHttp.readyState==4 && xmlHttp.status==200){
    //         // successful request -> receive bits after measurement

    //         let recv_bits = xmlHttp.responseText

    //         bits_text = document.getElementById('received-qubits')

    //         bits_text.innerHTML = recv_bits
            
    //         console.log(`Bob: \n\tBasis: ${basis_str}, Measured: ${recv_bits}`)
            
    //         button.disabled = false
    //     }
    // }
    button.disabled = false
    socket.emit("send basis", [basis_str, jcode])

    // xmlHttp.open("GET", "bob/data/?basis="+basis_str)
    // xmlHttp.send(null)
}

function bob_compare_basis(){
    // var xmlHttp = new XMLHttpRequest();
    // compare basis button was pressed
    // xmlHttp.onreadystatechange = function(){

    //     div_recv = document.getElementsByClassName('received-qubits')[0]
    //         document.getElementsByTagName
    //     childs = div_recv.childNodes;

    //     button = childs.getElementsByTagName('button')[0]

    //     if(xmlHttp.readyState==4 && xmlHttp.status==200){
    //         //  we got a successful response -> disable button again
    //         button.disabled = true
    //         key_str = xmlHttp.responseText

    //         key_el = document.getElementById('key-bits')

    //         key_el.innerHTML += key_str + ' '
    //     }
    // }
    button.disabled = true
    // key_str = xmlHttp.responseText

    // key_el = document.getElementById('key-bits')

    // key_el.innerHTML += key_str + ' '
    socket.emit("compare basis", jcode)

    // xmlHttp.open("GET", "bob/compare")
    // xmlHttp.send(null)
}


