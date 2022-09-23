const express = require('express');
const fs = require('fs');
const url = require('url')
const app = express();
const PORT = 8000;
let petIndex;
app.use(express.json());

app.get('/pets', (req, res) => {
    fs.readFile("./pets.json", (error, petsFile) => {
        if(error){
            console.log(error);
            res.status(500);
            res.send(error)
        } else {
            let parsePetData = JSON.parse(petsFile);
            res.send(parsePetData);
        }
    })
})

app.get('/pets/*', (req, res) => {
    let requestURL = req.url
    let petUrl = requestURL.split('/');
    petIndex = Number.parseInt(petUrl[2]);
    fs.readFile("./pets.json", (error, petsFile) => {
        let parsePetData = JSON.parse(petsFile);
        if(error){
            console.log(error);
            res.status(500);
            res.send(error, 'We couldn\t find what you were looking for');
        } else if(parsePetData[petIndex] === undefined){
            res.status(404);
            res.send(error)
        } else {
            res.send(parsePetData[petIndex]);
        }
    })
})

app.post('/pets', (req, res) => {
    let newPet = req.body
    // res.send('Usage: {age: AGE_NUMBER, kind: SPECIES, name: NAME}');
    fs.readFile('pets.json', (error, petsFile) => {
        if(error){
            console.log(error);
            res.status(500);
            res.send(error, 'We couldn\t find what you were looking for');
        } else if(newPet.age && newPet.kind && newPet.name) {
            let parsePetData = JSON.parse(petsFile);
            parsePetData.push(newPet)
            fs.writeFile("pets.json", JSON.stringify(parsePetData), (error) => {
                if(error){
                    console.log(error);
                    res.status(500);
                    res.send(error, 'We couldn\t find what you were looking for');
                } else {
                    res.status(201)
                    res.json(newPet)
                }
            })
        } else {
            res.status(406);
            res.send('Usage: {age: AGE_NUMBER, kind: SPECIES, name: NAME}')
        }
    })
})

app.delete('/pets/*', (req, res) => {
    let requestURL = req.url;
    let petUrl = requestURL.split('/');
    petIndex = Number.parseInt(petUrl[2]);
    fs.readFile('pets.json', (error, petsFile) => {
        let parsePetData = JSON.parse(petsFile);
        if(error){
            console.log(error);
            res.status(500);
            res.send(error, 'We couldn\t find what you were looking for');
        } else if(parsePetData[petIndex]){
            let deletedPet = parsePetData.splice(petIndex, 1);
            let petDataAfterDelete = JSON.stringify(parsePetData);
            fs.writeFile('pets.JSON', petDataAfterDelete, (error) => {
                if(error){
                    res.status(500);
                    res.send('Uh-oh, something went wrong on our end');
                } else {
                    res.status(202);
                    res.send(`Pet was deleted ${JSON.stringify(deletedPet)}`);
                }
            }) 
        } else {
            res.status(404);
            res.send('This entry doesn\'t exist yet');
        }
    })
})

app.listen(PORT, function(){
    console.log(`server is running on port ${PORT}`);
})