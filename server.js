const express = require('express');

const app = express();
require('dotenv').config()

const path = require('path');
const dbConfig = require('./config/dbConfig');
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const doctorRoute = require("./routes/doctorsRoute");

app.use(express.json());
app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/doctor', doctorRoute);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static("client/build"));
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client/build/index.html"));
    });
  }

app.listen(PORT,()=>console.log(`Node server started at port- ${PORT}`));
