var express = require('express');
var router = express.Router();
	
var requestIp = require('request-ip');
let package = require("../package.json");


// const elastic = require("elastic.js")

// import {search_database} from "elastic.js"

let codeIPMap = new Map()
let tempA = new Map()

let jointMap = new Map()

let linkMap = new Map()

/* GET home page. */
router.get('/', function(req, res, next) {
    // choose entry point (debug)
    local_code = Math.floor(Math.random() * 10000) // randomly generate code
    res.locals.user_code = local_code
    var clientIp = requestIp.getClientIp(request);
  
    codeIPMap[local_code] = clientIp
    // ipCodeMap[clientIp] = local_code
    res.sendFile('entry.html', {root: './views'})
    // res.sendFile('alice.html', {root: './views'})
    // res.sendFile('bob.html', {root: './v iews'})

});

router.get("/alice/data", (req, res, next) => {

    let basis = req.query.basis
    let bits = req.query.bits
    
    var clientIp = requestIp.getClientIp(req);
    tempA[clientIp] = [basis, bits]  
})

router.get("/bob/data", (req, res, next) => {
    let basis = req.query.basis
    
    var clientIp = requestIp.getClientIp(req);
    
    ipA = linkMap[clientIp][1]

    qubitA = tempA[ipA]

    if(basis.length != qubitA[0].length || basis.length != qubitA[1].length ){
        res.sendStatus(201)
        // qubit length is wrong
        return;
    }

    B_bits = ''
    for(let i=0; i<basis.length; ++i){
        if(basis[i] == qubitA[0][i]){
            B_bits += qubitA[1][i]
        } else {
            B_bits += Math.floor(Math.random()*2) 
        }
    }
    res.send(B_bits)


})

router.get('/bob/compare', (req, res, next) => {
    ipB = requestIp.getClientIp(req);
    ipA = linkMap[ipB][1]

})

router.get("/connect", (req, res, next) => {
    let code1 = req.query.myCode
    let code2 = req.query.friendCode

    if(codeMap.has(code1) && codeMap.has(code2) && code1 != code2){
        ip1 = codeIPMap[code1]
        ip2 = codeIPMap[code2]

        if(linkMap.has(ip1)){
            linkMap.delete(linkMap[ip1][1])
        }
        if(linkMap.has(ip2)){
            linkMap.delete(linkMap[ip2][1])
        }
        linkMap[ip1] = ['A', ip2]
        linkMap[ip2] = ['B', ip1]
        
    }  
})


module.exports = router;
