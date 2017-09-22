'use strict'

const express = require('express');
const app = express()

var TCPPort = 8081;


app.get ('/', function (req, res) {
  res.send('Hello World')
});

app.listen(TCPPort, function() {
  console.log('Listingin on port');
)
