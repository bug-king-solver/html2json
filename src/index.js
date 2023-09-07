const fs = require('fs');
const parseHTML = require('./parser');

const filePath = process.argv[2];

const htmlString = fs.readFileSync(filePath, 'utf8');
const result = parseHTML(htmlString);
console.log(result);
