import mongoose from 'mongoose';

const connectDB = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  
  await mongoose.connect(process.env.mongodburl, {
  }, () => console.log("I am connnected"));

  return handler(req, res);
};

export default connectDB;