// utils/dbConnect.js
import mongoose from 'mongoose';

const dbConnect = () => {
  // Replace with your MongoDB connection string
  return mongoose.connect('mongodb://localhost:27017/cheff_connect_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default dbConnect;