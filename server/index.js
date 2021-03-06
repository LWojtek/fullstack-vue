const express = require('express');
const cors = require('cors');
import dotenv from 'dotenv'
dotenv.config()

// Init app
const app = express();

// Middleware 

app.use(express.json());
app.use(cors());

const posts = require('./routes/api/posts');

app.use('/api/posts', posts);

// Handle production 

if (process.env.NODE_ENV === 'production') {
    // Static folder 
    app.use(express.static(__dir + '/public/'));

    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}.`));