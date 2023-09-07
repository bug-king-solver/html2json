const express = require('express');
const parseHTML = require('./parser');
const cors = require('cors'); // Import the cors middleware
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.use(cors());

app.post('/parse', (req, res) => {
    const { html } = req.body;
    const result = parseHTML(html);
    res.json(result);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});