const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: './config/config.env' });

const app = express();

const port = process.env.PORT || 5000;

// Allow App to parse JSON
app.use(express.json())

app.get('/', (req, res, next) => {
    res.send("Hello World");
})

const server = app.listen(port, () => {
    console.log(`The app is running on port on port ${port}`);
});