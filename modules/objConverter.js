var execSync = require('child_process').execSync;
var fs = require('fs');
var fileUpload = require("express-fileupload");
var path = require("path");

var convert = function( request, response){
	var file;

  if (!request.files || request.files.objfile.name == "") {
    response.send("No files were uploaded");
    return;
  }

  file = request.files.objfile;

	
  file.mv(path.join(__dirname + '/../original/') + file.name, function(err) {
    if (err) {
      response.status(500).send(err);
    }
    else {
      response.send("File uploaded.");
    }
  });
	var original_fileName = file.name;
	var baseFilename = file.name.replace(/\.[^/.]+$/, "");
	console.log(baseFilename);
	var scriptString = '';
	scriptString += 'python convert_obj_three_for_python3.py -i original/' + original_fileName + ' -o converted/' + baseFilename + '.js';
	execSync(scriptString);
	
	fs.unlink('original/'+original_fileName, function(){
		
	});
}



module.exports = {
	convert:convert
};


