


function connect_alice_bob(){


    var xmlHttp = new XMLHttpRequest();

    let myCode = document.getElementById('usercode').innerHTML
    let friendCode = document.getElementById('friendcode').value


    // xmlHttp.onreadystatechange = () => {
    //     if()
    // }


    xmlHttp.open("GET", `connect/?myCode=${myCode}&?friendCode=${friendCode}`)
    xmlHttp.send(null)

}