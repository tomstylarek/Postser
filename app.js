const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

// register view engine
app.set('view engine', 'ejs');

// connect to mongodb
const dbURI = 'mongodb+srv://tomasstylarek:tom1PINCHARATA@node-crash-course.7dwon.mongodb.net/node-crash-course?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => (
        app.listen(3000, () => {
        console.log("Listening on port 3000");
    })))
    .catch(err => console.log(err));


// middleware for static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: 'Not Found' });
})