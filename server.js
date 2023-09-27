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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const totalNotes = await Note.countDocuments();
        const totalPages = Math.ceil(totalNotes / limit);

        const notes = await Note.find()
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({
            page,
            totalPages,
            notes
        });
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
});

app.get('/notes/search', async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({message: 'Query parameter is required'});
    }

    try {
        const notes = await Note.find({
            $or: [
                {title: {$regex: query, $options: 'i'}},
                {content: {$regex: query, $options: 'i'}}
            ]
        });

        res.json(notes);
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
});

app.get('/notes/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({message: 'Note not found'});
        }

        res.json(note);
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
});

app.post('/notes', async (req, res) => {
    const {title, content} = req.body;

    if (!title.trim() || !content.trim()) {
        return res.status(400).json({message: 'Title and content are required'});
    }

    try {
        const note = new Note({
            title,
            content,
        });
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
});

app.delete('/notes/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const deletedNote = await Note.findByIdAndDelete(id);

        if (!deletedNote) {
            return res.status(404).json({message: 'Note not found'});
        }

        res.json(deletedNote);
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
});

app.put('/notes/:id', async (req, res) => {
    const {id} = req.params;
    const {title, content} = req.body;

    if (!title || !content) {
        return res.status(400).json({message: 'Title and content are required'});
    }

    try {
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            {title, content},
            {new: true}
        );

        if (!updatedNote) {
            return res.status(404).json({message: 'Note not found'});
        }

        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
