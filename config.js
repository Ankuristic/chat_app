const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/chatApp", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("db is connected");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

module.exports = connect;