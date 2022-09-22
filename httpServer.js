//create server http.createServer(function(req, res){
//})
//add listen function, var for server plus a .listen method(port, function())
//send http response
'use strict';
let http = require('http');
let fs = require('fs');
let path = require('path')
let url = require('url')
let petsPath = path.join(__dirname, "pets.json")
var port = process.env.PORT || 8000;

//Use server GET and POST to access JSON through pet.js app function
const petServer = http.createServer(function(req, res){
   if(req.method === 'GET' && req.url === "/pets"){
        fs.readFile(petsPath, "utf8", function(error, data){
            if(error){
                console.error(error);
                res.statusCode = 404;
                res.setHeader('Method', 'GET')
                res.setHeader('Content-Type', `text/plain`);
                res.end('You messed up');
            }
            res.setHeader('Method', 'GET')
            res.setHeader('Content-Type', 'application/json')
            res.end(data)
        })
    } else if(req.method === 'GET' && req.url === `/pets/0`){
        fs.readFile(petsPath, "utf8", function(error, data){
            if(error){
                console.error(error);
                res.statusCode = 404;
                res.setHeader('Method', 'GET')
                res.setHeader('Content-Type', `text/plain`);
                res.end('You messed up');
            }
            let parseData = JSON.parse(data);
            let resultData = JSON.stringify(parseData[0]);

            res.setHeader('Method', 'GET')
            res.setHeader('Content-Type', 'application/json')
            res.end(resultData)
        })
    } else if(req.method === 'GET' && req.url === `/pets/1`){
        fs.readFile(petsPath, "utf8", function(error, data){
            if(error){
                console.error(error);
                res.statusCode = 404;
                res.setHeader('Method', 'GET')
                res.setHeader('Content-Type', `text/plain`);
                res.end('You messed up');
            }
            let parseData = JSON.parse(data);
            let resultData = JSON.stringify(parseData[1]);

            res.setHeader('Method', 'GET')
            res.setHeader('Content-Type', 'application/json')
            res.end(resultData)
        })
    } else {
        res.statusCode = 404;
        res.setHeader('Method', 'GET');
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not found');
    }
})

petServer.listen(port, function(){
    console.log('listening on', port);
})