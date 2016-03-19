var fs = require('fs'),
	path = require('path'),
	rimraf = require('rimraf').sync;

var
	baseInput = './src/resources/',
	data = {},
	outputPath = path.join(baseInput, 'index.js');

rimraf(outputPath);

fs.readdirSync(baseInput).forEach(function(filename) {
	var fileContent = fs.readFileSync(path.join(baseInput, filename), 'utf8'),
		fileData = JSON.parse(fileContent.substring(7, fileContent.lastIndexOf('}')+1)),
		languageCode = filename.substr(0, filename.lastIndexOf('.'));
	data[languageCode] = {
		name: fileData.translation.name,
		names: fileData.translation.names
	};
});

fs.writeFileSync(outputPath, 'define(' + JSON.stringify(data, null, '\t') + ');', 'utf8' );
