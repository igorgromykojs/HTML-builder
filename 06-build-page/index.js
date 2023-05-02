let fs = require('fs');
let path = require('path');

let template = path.join(__dirname, 'template.html')
let fileContent = fs.readFileSync(template, 'utf8');
console.log(fileContent.replace('{{header}}', 'ok'));