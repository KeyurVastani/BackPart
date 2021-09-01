const express = require('express');
const app = express();
require('./dataBase/mongoose');
require('dotenv').config();
const port = process.env.DB_PORT || 4000;
app.use(express.json());


app.use(express.json());

//router
app.use(require('./router/auth'))
app.use(require('./router/book'))




app.get('/', (req, res) => {
    res.send("hello");
});




app.listen(port,()=>{
    console.log('server is on !!!',port);
})