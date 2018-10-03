var express = require('express');
var app = express();
var request = require('request');
var nsurl = process.env.NSURL;

app.use(express.static('public'));

app.get('/', function (req, res) {
	

	request({
		url: nsurl + '/api/v1/entries.json?count=1000',
		json: true
	}, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			//console.log(body) // Print the json response
			var notes = [];
			for (var x in body) {
				var log = body[x];
				notes.push(log.sgv);
			}

			notes = notes.reverse();
			
			var code = "var notes = "+JSON.stringify(notes)+";";
			var html = "<html>" 
						+ "<head>" 
							+ "<title>Musical Glucose</title>"
						+ "</head>" 
						+ "<body>"
							+ "A quick and dirty musical representation of my last 1000 blood glucose readings: " 
							+ "<span id=\"freq\">000 mg/dL</span>" 
							+ "<div class=\"ct-chart ct-perfect-fourth\"></div>"
							+ "<script src=\"https://code.jquery.com/jquery-3.2.1.min.js\" integrity=\"sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=\" crossorigin=\"anonymous\"></script>"
							+ "<script type=\"text/javascript\">" + code + "</script>" 
							+ "<link rel=\"stylesheet\" href=\"//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css\">"
    							+ "<script src=\"//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js\"></script>"
							+ "<script src=\"musical.js\" type=\"text/javascript\"></script>" 
						+ "</body>" 
					+"</html>";

			res.send(html);
		}
	})

})

var port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log('Example app listening on port '+port);
})
