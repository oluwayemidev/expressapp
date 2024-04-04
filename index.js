const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

const app = express();

const dbURI = 'mongodb+srv://admin:test123@node-tuts.fytvyoz.mongodb.net/'

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(4000))
  .catch((err) => console.log(err));

app.use(morgan('dev'));

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.redirect('/blogs')
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' })
})

app.use('/blogs', blogRoutes);

app.get('*', (req, res) => {
  res.status(404).render('404', { title: 'Page not found' })
})

module.exports = app;