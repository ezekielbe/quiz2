const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object
const studentSchema = new mongoose.Schema({
  myName: String,
  mySID: String
});

// Create a Model object
const Student = mongoose.model('s24students', studentSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  // get the data from the form
  const { myuri } = req.body;

  try {
    // connect to the database and log the connection
    await mongoose.connect(myuri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // add the data to the database
    const newStudent = new Student({
      myName: "Ezekiel Benaiah", 
      mySID: "300371933" 
    });

    await newStudent.save();

    // send a response to the user
    res.send(`<h1>Document Added</h1>`);
  } catch (err) {
    console.error(err);
    res.send(`<h1>Error connecting to MongoDB</h1>`);
  }
});
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
