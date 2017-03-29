var express = require('express');
var app = express();
var request = require('request');

app.use(express.static('public'));

app.get('/', function (req, res) {
	

	request({
		url: 'http://www.beetusbeep.com/api/v1/entries.json?count=100',
		json: true
	}, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			//console.log(body) // Print the json response
			var notes = [];
			for (var x in body) {
				var log = body[x];
				notes.push(log.sgv);
			}

			var code = "var notes = "+JSON.stringify(notes)+";";
			var html = "<html>" 
						+ "<head>" 
							+ "<title>Musical Glucose</title>" 
						+ "</head>" 
						+ "<body>"
							+ "A quick and dirty musical representation of my last 100 blood glucose readings: " 
							+ "<span id=\"freq\">000 mg/dL</span>" 
							+ "<script src=\"https://code.jquery.com/jquery-3.2.1.min.js\" integrity=\"sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=\" crossorigin=\"anonymous\"></script>"
							+ "<script type=\"text/javascript\">" + code + "</script>" 
							+ "<script src=\"musical.js\" type=\"text/javascript\"></script>" 
						+ "</body>" 
					+"</html>";

			res.send(html);
		}
	})

})

app.listen(80, function () {
	console.log('Example app listening on port 80!')
})