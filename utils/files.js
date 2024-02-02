const fs = require('fs')
const path= require('path')

function readAllFiles( targetedDirectory, requiredExtension){
    try{
        const files= fs.readdirSync(targetedDirectory)
        // filtering files with required extenstion
        const filteredFiles= files.filter(file=>path.extname(file)===`${requiredExtension}`)
        filteredFiles.forEach(file=>{
            console.log(file)
        })

    }catch(error){
        console.log(
             'Files with required extension are not available')
    }
}

module.exports= files