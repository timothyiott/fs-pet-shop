let fs = require('fs');
let command = process.argv[2];

function getPetData(){
    if(command == 'read'){
    fs.readFile("pets.json", "utf8", function(error, data){
        let parsedPets = JSON.parse(data);
        if(error){
            console.error(error)
        } else if(process.argv[3] == undefined){
            console.log(parsedPets);
        } else if(parsedPets[process.argv[3]] == undefined ){
            process.stderr.write("Usage: node pets.js read INDEX\n")
        } else {
            console.log(parsedPets[process.argv[3]]);
        }
        process.exit(1);
    })
    } else if(command == 'create'){
    fs.readFile("pets.json", "utf8", function(error, data){
        let parsedPets = JSON.parse(data)
        if(error){
            console.error(error)
        } else if(process.argv[3] !== undefined && process.argv[4] !== undefined && process.argv[5] !== undefined){
            let content = { age: Number(process.argv[3]), kind: process.argv[4], name: process.argv[5]};
            parsedPets.unshift(content)
            fs.writeFile('pets.json', JSON.stringify(parsedPets), (error) =>{
                if(error){
                    console.error(error)
                } 
            })
        } else {
            process.stderr.write("Usage: node pets.js create AGE KIND NAME\n")
        }
        process.exit(1);
    })
    } else {
    process.stderr.write('Usage: node pets.js [read | create | update | destroy]\n')
    // throw new Error('Whoops, no work done')
    process.exit(1);
    }
}

getPetData();

module.exports = getPetData;