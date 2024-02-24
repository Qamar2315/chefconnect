const mongoose = require('mongoose');

const dbconnect = () => {
  mongoose.connect('mongodb://localhost:27017/cheff_connect_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });
}

module.exports=dbconnect;