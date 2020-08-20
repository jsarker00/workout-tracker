const path = require('path');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const app = express();
const db = require('./models');

const PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

const MONGOOD_URI = process.env.MONGODB_URI || 'mongodb://localhost/workoutDB';

mongoose.connect(MONGOOD_URI, {
    useNewUrlParser: true,
});

app.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'exercise.html'));
});

app.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'stats.html'));
});

app.get('/api/workouts', async (req, res) => {
    const arr = await db.Workout.find();
    res.json(arr);
});

app.get('/api/workouts/range', async (req, res) => {
    const arr = await db.Workout.find();
    res.json(arr);
});

app.post('/api/workouts', async (req, res) => {
    const data = await db.Workout.create(req.body);
    res.json(data);
});

app.put('/api/workouts/:id', async (req, res) => {
    const data = await db.Workout.updateOne({
        _id: mongoose.Types.ObjectId(req.params.id),
    }, {
        $push: {
            exercises: req.body
        }
    });

    res.json(data);
});
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});