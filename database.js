
const dotenv= require('dotenv')
const app= require('./index')
dotenv.config({path:'./config.env'})

const DB= process.env.DATABASE_LOCAL
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false

}).then(con=>{
    console.log(con.connections)
    console.log('Database connected successfully')
})

const port= process.env.PORT||3000
app.listen(port, ()=>{
    console.log(`database server is running on port ${port}`)
})