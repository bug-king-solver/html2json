# HTML to JSON Converter

## Description

This is a JavaScript program that converts HTML code to a JSON object.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install this program using npm or yarn:

```bash
npm install html2jsonconvertor

or

yarn add html2jsonconvertor
```

## Usage

To use the HTML to JSON converter, you can do the following:

```javascript
const parseHTML = require("html2jsonconvertor");

const html = `
    <div style="background-color: yellow; font-size: 14px" id="first-div"> 
        Hello, friends 
        <p class="para" style="font-faimly: monospace; font-size: 11px"> Lorem ipsum dolor sit </p>
        <footer style="width: auto; height: 100px; color: blue"> <span> This is the end </span> </footer>
    </div>`;
const json = parseHTML(html);

console.log(json);
```

## CLI & Browser Integration

- CLI (index.js)
- Browser (server.js)
