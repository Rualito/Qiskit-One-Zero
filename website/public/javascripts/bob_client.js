

function bob_send_basis(){
    let basis_str = document.getElementById('select-basis').value
    var xmlHttp = new XMLHttpRequest();

    div_recv = document.getElementsByClassName('received-qubits')[0]
            document.getElementsByTagName
    childs = div_recv.childNodes;

    button = childs.getElementsByTagName('button')[0]

    xmlHttp.onreadystatechange = function (){
        if(xmlHttp.readyState==4 && xmlHttp.status==200){
            // successful request -> receive bits after measurement

            let recv_bits = xmlHttp.responseText

            bits_text = document.getElementById('received-qubits')

            bits_text.innerHTML = recv_bits
            
            console.log(`Bob: \n\tBasis: ${basis_str}, Measured: ${recv_bits}`)
            
            button.disabled = false
        }
    }

    xmlHttp.open("GET", "bob/?basis="+basis_str)
    xmlHttp.send(null)
}

function bob_compare_basis(){
    var xmlHttp = new XMLHttpRequest();
    // compare basis button was pressed
    xmlHttp.onreadystatechange = function(){

        div_recv = document.getElementsByClassName('received-qubits')[0]
            document.getElementsByTagName
        childs = div_recv.childNodes;

        button = childs.getElementsByTagName('button')[0]

        if(xmlHttp.readyState==4 && xmlHttp.status==200){
            //  we got a successful response -> disable button again
            button.disabled = true
            key_str = xmlHttp.responseText

            key_el = document.getElementById('key-bits')

            key_el.innerHTML += key_str + ' '
        }
    }

    xmlHttp.open("GET", "bob/compare")
    xmlHttp.send(null)
}


