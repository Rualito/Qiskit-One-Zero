

basis_denom = ['C', 'D']
c_bits = ['0', '1']
d_bits = ['+', '-']

function alice_send() {
    let basis_str = document.getElementById("select-basis").value
    let bits_str = document.getElementById("send-bits").value
    


    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status==200) {
            // if successful request -> confirm that bits are sent
            let send_str = ''
            for(let i=0; i<basis_str.length; i++) {
                
                if(basis_str.charAt(i) == basis_denom[0]){
                    send_str += c_bits[ Math.round(bits_str.charAt(i)) ]
                } else {
                    send_str += d_bits[ Math.floor(bits_str.charAt(i)) ]
                }   
            }

            let sent_text = document.getElementById('sent-bits')
            sent_text.innerHTML = send_str
        
        }
    }
}
