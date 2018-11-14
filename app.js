
const express = require('express')
const path = require('path');
const cors = require('cors');

const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(bodyParser.json({ type: 'application/*+json' }));

app.use(morgan('dev'));
app.use(cors()) 

// Set Static Folder
app.use(express.static('frontend/dist/mycare123'));

app.use('/patients', require('./routes/patients'));
app.use('/tests_categories', require('./routes/tests_categories'));
app.use('/tests', require('./routes/tests'));
app.use('/tests_items', require('./routes/tests_items'));

// app.use('/visits', require('./routes/visits'));


// app.use((req, res, next) => {
//   const error = new Error('Not found');
//   error.status = 404;
//   next(error);
// });

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


console.log(path.join(__dirname, 'frontend/dist/mycare123/index.html'));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/mycare123/index.html'));
});

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))

