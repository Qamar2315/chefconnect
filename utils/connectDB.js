import mongoose from 'mongoose';

const dbConnect = () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    throw new Error('MongoDB connection string is not provided in the environment variables.');
  }

  return mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default dbConnect;
