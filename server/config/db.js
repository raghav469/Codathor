const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
      // Remove these deprecated options:
      // useCreateIndex: true,
      // useFindAndModify: false
    });
    
    console.log('MongoDB Connected...');
    
    // Create indexes using the new method
    await mongoose.connection.collection('competitions').createIndex({ title: 'text' });
    await mongoose.connection.collection('submissions').createIndex({ status: 1 });
    
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;