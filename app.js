const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;



app.get('/', (req, res) => {
  res.send("hello")
})


app.get('/getAddress',function(req,res,next){
    res.send(req.query)
    let data = JSON.stringify(req.query);
    fs.writeFileSync('./address/'+String(req.query.address+".json"), data);
  })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})