const express = require('express')
const app = express()
app.use(express.json());
const dotenv = require('dotenv').config()
const path =require("path");
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const cors = require("cors");
app.use(cors({
  origin: true, // temporary (we'll fix later)
  credentials: true
}));
const mongoose = require("mongoose");
async function connectDB() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB: ", err);
  }
}

connectDB();

const newsroute = require('./controller/news.js')
const authroute = require('./controller/auth.js')
const airoute = require('./controller/ai.js')
const ttsroute = require('./controller/tts.js')
const otproute = require('./controller/otp.js')
const savefeatureroute  = require('./controller/savefeature.js');
app.use('/news', newsroute)
app.use('/auth', authroute);
app.use('/ai', airoute);
app.use('/tts', ttsroute);
app.use('/otp', otproute);
app.use('/save', savefeatureroute);

app.get('/', (req, res) => {

})

app.listen(process.env.port, () => {
    console.log(`Server is running on port ${process.env.port}`);
})

