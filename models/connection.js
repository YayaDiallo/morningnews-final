const mongoose = require('mongoose');
require('dotenv').config();

const options = {
  connectTimeoutMS: 5000,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

// URI_BDD Credentials
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbname = 'morningnews-correction';
const URI_BDD = `mongodb+srv://${username}:${password}@cluster0.9rdyy.mongodb.net/${dbname}?retryWrites=true&w=majority`;

try {
  // Connect to the MongoDB cluster
  mongoose.connect(URI_BDD, options, () => {
    console.log(' Mongoose is connected');
  });
} catch (e) {
  console.log('could not connect');
}

module.exports = mongoose;
