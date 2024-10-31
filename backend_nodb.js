var express = require('express');
var app = express();
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

// Define the Comments model
const Comments = sequelize.define(
  'Comments',
  {
    // Model attributes are defined here
    contents: {
      type: DataTypes.STRING,
      allowNull: false, // Make the contents field required
    },
  },
  {
    // Other model options go here (if any)
  }
);

// Async function to sync the Comments model with the database
async function asyncFunction() {
  await Comments.sync(); // Sync the model with the database, creating the table if it doesn't exist
  console.log('The table for the Comments model was just (re)created!');
}

// Call the async function to sync the model
asyncFunction();


// // `sequelize.define` also returns the model
// console.log(Comments === sequelize.models.Comments); // true

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', async function(req, res) {
  const comments = await Comments.findAll();
  res.render('frontend_db.ejs', {comments: comments}); // object transferred to frontend (key, value)
});

app.get('/comment', function(req, res) {
  console.log(req.query)
  res.send('get method')
});

app.post('/comment', async function(req, res) {
  // console.log(req.body)
  const comment = req.body.comment
// Create a new user
const ID = await Comments.create({ contents: comment });
console.log("Auto-ID:", ID.id);
// console.log(comments)
  // res.send('post method')
  res.redirect('/')
});

app.listen(3000);
console.log('Server is listening on port 3000');






