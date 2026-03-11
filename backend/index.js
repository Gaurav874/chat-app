const express = require("express")
const app = express()
const cors = require("cors")

require('dotenv').config();
port = process.env.PORT || 3000;

const cookieParser = require("cookie-parser")
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
})
);

const routes = require("./routes/signuproute")
const messageroutes = require("./routes/messageroute")

app.use('/api/v1/', routes)
app.use('/api/message/', messageroutes)

const dbConnect = require("./config/database");
dbConnect()

app.listen(port,function (){
    console.log(`server is started at port number ${port}`);
})

// app.get("/",(req,res)=>{
//     res.send(`<h1>Heloo Jee</h1>`)
// })