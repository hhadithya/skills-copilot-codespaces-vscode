// create web server with express
const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.json({ message: err });
    }
});

// Get specific comment
router.get('/:commentId', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        res.json(comment);
    } catch (err) {
        res.json({ message: err });
    }
});

// Post a comment
router.post('/', async (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        text: req.body.text,
        date: req.body.date
    });

    try {
        const savedComment = await comment.save();
        res.json(savedComment);
    } catch (err) {
        res.json({ message: err });
    }
});

// Delete a comment
router.delete('/:commentId', async (req, res) => {
    try {
        const removedComment = await Comment.remove({ _id: req.params.commentId });
        res.json(removedComment);
    } catch (err) {
        res.json({ message: err });
    }
});

// Update a comment
router.patch('/:commentId', async (req, res) => {
    try {
        const updatedComment = await Comment.updateOne(
            { _id: req.params.commentId },
            { $set: { name: req.body.name, text: req.body.text, date: req.body.date } }
        );
        res.json(updatedComment);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
