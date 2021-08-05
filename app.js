const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.get('/', (req, res) => {
  res.send("hello")
})


app.get('/getAddress',function(req,res,next){
    let data = JSON.stringify(req.query);
    fs.writeFileSync('./address/'+String(req.query.address+".json"), data);
    // res.send(req.query)
    res.send("success")
  })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
