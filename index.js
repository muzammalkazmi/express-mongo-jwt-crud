const express= require('express')
const mongoose= require('mongoose')
const morgan = require('morgan')
const bodyParser = require ('body-parser')
const axios= require('axios')
const app = express()
const employeeRoute = require('./routes/employeeRoute')
const authRoute= require('./routes/authRoute')
const files= require('./utils/files')
const port= 3000
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/testdb', {useNewUrlParser:true, useUnifiedTopology:true})
const db= mongoose.connection
db.on('error', (error)=>{
    console.log(error)
})

db.once('open', ()=>{
    console.log('connection has been established successfully')
})


 const links =[
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3'
    ]

// function to itrate over and download each url
  async function downloadData(links){
    try{
        const downloadedContent = links.map(async(url)=>{
            const response= await axios.get(url)
            return response.data
        })
        const downloadAllData= await Promise.all(downloadedContent)
        return downloadAllData
    }catch(error){
console.log("error downloading error")
throw error
    }

  }

  // Using Express
  app.get('/downloads', async(req, res)=>{
try{
    const downloadAllData= await downloadData(links)
    res.json({downloadAllData})

}catch(err){
res.status(500).json({error: "Unable to fetch data"})
}

})
app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`)
})

app.use('/api/employee', employeeRoute)
app.use('/api', authRoute)
app.use('/files')