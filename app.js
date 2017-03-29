var express = require('express')
var app = express()

app.get('/', function (req, res) {
	

	var html = "<html><head><title>Musical Glucose</title></head><body></body></html>";
	res.send(html);
})

app.listen(80, function () {
	console.log('Example app listening on port 3000!')
})