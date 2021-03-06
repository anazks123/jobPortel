const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Connected to database');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
//mongodb+srv://harsha2002:harsha2002@dasswebapp.ybol9.mongodb.net/Jobportal?retryWrites=true&w=majority

module.exports = connectDB;
