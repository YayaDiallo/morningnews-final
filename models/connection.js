var mongoose = require('mongoose');

var options = {
  connectTimeoutMS: 5000,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose.connect(
  'mongodb+srv://lacapsule:passwordkindi@cluster0.9rdyy.mongodb.net/morningnews-correction?retryWrites=true&w=majority',
  options,
  function (err) {
    console.log(err);
  }
);

module.exports = mongoose;
