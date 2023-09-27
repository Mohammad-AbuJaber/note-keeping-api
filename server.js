const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Note = require('./noteSchema');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/note-keeping', {
    useNewUrlParser: true, useUnifiedTopology: true,
});

app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
