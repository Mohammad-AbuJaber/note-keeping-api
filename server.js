const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Note = require('./noteSchema');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/note-keeping', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
