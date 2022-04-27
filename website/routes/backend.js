var app  = require('express');
var router = app.Router();
var http = require('http').Server(app);

var requestIp = require('request-ip');
let package = require("../package.json");

const io = require('socket.io')(http,{
    // Specifying CORS 
    cors: {
    origin: "*",
    }
})

// console.log(location.hostname)


let codeIPMap = new Map()
let tempA = new Map()

// let jointMap = new Map()
let basisMatchMap = new Map()
let linkMap = new Map()


io.on('connection', (socket) => {
    socket.on('add user', (userCode) => {
        // initializes all user codes
        codeIPMap[userCode] = socket
    })
    socket.on('join codes', (data)=>{
        // receives the connect codes between alice and bob
        codeA = data[0] // Alice code
        codeB = data[1] // Bob code
        
        jcode = Math.floor(Math.random() * 10000)
        linkMap[jcode] = [-1,-1]
        codeIPMap[codeA].emit('join cookie', jcode)
        codeIPMap[codeB].emit('join cookie', jcode)

        codeIPMap[codeA].emit('redirect', package.ipAddr + "/alice")
        codeIPMap[codeB].emit('redirect', package.ipAddr + "/bob")

    })
    socket.on('join alice', (ucode, jcode) => {
        linkMap[jcode][0] = ucode
        codeIPMap[ucode] = socket
    })
    socket.on('join bob', (ucode, jcode) => {
        linkMap[jcode][1] = ucode
        codeIPMap[ucode] = socket
    })
    socket.on('send qubit', (data, jcode)=>{
        basis_str = data[0]
        bits_str = data[1]
        jcode = data[2]

        tempA[jcode] = [basis_str, bits_str]
    })  
    socket.on("compare basis", (jcode)=>{
        uAcode = linkMap[jcode][0]
        uBcode = linkMap[jcode][1]
        
        socket.emit("get key", basisMatchMap[jcode] )
    });
    // bob sends the basis back
    socket.on("send basis", (basis, jcode) => {
        uBcode = linkMap[jcode][1]
        qubitA = tempA[jcode]
        if(basis.length != qubitA[0].length || basis.length != qubitA[1].length ){
            // qubit length is wrong
            return;
        }
        match_arr = []
        B_bits = ''
        for(let i=0; i<basis.length; ++i){
            if(basis[i] == qubitA[0][i]){
                B_bits += qubitA[1][i]
                match_arr.append(true)
            } else {
                match_arr.append(false)
                B_bits += Math.floor(Math.random()*2) 
            }
        }
        basisMatchMap[jcode] = [B_bits, match_arr]
        // res.send(B_bits)
    
        socket.emit("measured", B_bits) 
    });

})

// const elastic = require("elastic.js")

// import {search_database} from "elastic.js"

/* GET home page. */
router.get('/', function(req, res, next) {
    // choose entry point (debug)
    // local_code = Math.floor(Math.random() * 10000) // randomly generate code
    // res.locals.user_code = local_code
    // res.locals.ipAddr = package.ipAddr
    // var clientIp = requestIp.getClientIp(request);
  
    // codeIPMap[local_code] = clientIp
    // ipCodeMap[clientIp] = local_code
    res.sendFile('entry.html', {root: './views'})
    // res.render('entry', {root: './views'})
    // res.sendFile('alice.html', {root: './views'})
    // res.sendFile('bob.html', {root: './v iews'})

});

router.get("/alice", (req, res, next) => {
    res.sendFile('alice.html', {root: './views'})
})

router.get("/bob", (req, res, next) => {
    res.sendFile('bob.html', {root: './views'})
})

//     let basis = req.query.basis
//     let bits = req.query.bits
    
//     var clientIp = requestIp.getClientIp(req);
//     tempA[clientIp] = [basis, bits]  
// })

// router.get("/bob/data", (req, res, next) => {
//     let basis = req.query.basis
    
//     var clientIp = requestIp.getClientIp(req);
    
//     ipA = linkMap[clientIp][1]

//     qubitA = tempA[ipA]

//     if(basis.length != qubitA[0].length || basis.length != qubitA[1].length ){
//         res.sendStatus(201)
//         // qubit length is wrong
//         return;
//     }

//     B_bits = ''
//     for(let i=0; i<basis.length; ++i){
//         if(basis[i] == qubitA[0][i]){
//             B_bits += qubitA[1][i]
//         } else {
//             B_bits += Math.floor(Math.random()*2) 
//         }
//     }
//     res.send(B_bits)


// })

// router.get('/bob/compare', (req, res, next) => {
//     ipB = requestIp.getClientIp(req);
//     ipA = linkMap[ipB][1]

// })

// router.get("/connect", (req, res, next) => {
//     let code1 = req.query.myCode
//     let code2 = req.query.friendCode

//     if(codeMap.has(code1) && codeMap.has(code2) && code1 != code2){
//         ip1 = codeIPMap[code1]
//         ip2 = codeIPMap[code2]

//         if(linkMap.has(ip1)){
//             linkMap.delete(linkMap[ip1][1])
//         }
//         if(linkMap.has(ip2)){
//             linkMap.delete(linkMap[ip2][1])
//         }
//         linkMap[ip1] = ['A', ip2]
//         linkMap[ip2] = ['B', ip1] 
//     }  


// })


module.exports = router;
