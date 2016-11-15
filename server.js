var express = require("express");
var path = require("path");
var fileUpload = require("express-fileupload");
var http = require("http");
var objConverter = require('./modules/objConverter');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(fileUpload());
app.get("/", function (request, response){

});
app.get("/file_upload", function(request, response) {
  response.sendFile(path.join(__dirname + '/views/file_upload.html'));
});

app.post("/upload", function(request, response) {
  
	//Convert file
	objConverter.convert(request, response);
	
});


app.listen(3000, function() {
  console.log("Express app is listening on port 3000");
})
