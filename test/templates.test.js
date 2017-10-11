
var data = {
	"cssfile": "slug.css",
	"jsfile": "slug.js",
	"meetup": {
		"date": "11 November 2017",
		"time": "18:30 - 21:00",
		"venue": "Financial Times"
	}
};

var appTemplate = require('../dist/templates/index.js');
var html = appTemplate(data);
var fs = require('fs');

fs.writeFile("test.html", html, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 