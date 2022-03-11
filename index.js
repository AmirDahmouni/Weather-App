const express = require("express");
const app = express();
const config = require("config");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes=require("./routes/userRoutes")

app.enable("trust proxy");
app.use(cors({ origin: `http://localhost:3000`, credentials: true }));
app.use(express.json()); // for parsing application/json we use it as middleware in pipeline return the req.body
app.use(express.urlencoded({ extended: true }))


mongoose.connect(config.get("db"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`connected to ${config.get("db")}`))
    .catch(() => console.log(`failed coonection to ${config.get("db")}`));


app.use("/user",userRoutes);
  

const server = app.listen(config.get("port"), () =>console.log(`listening on port ${config.get("port")}...`));

module.exports = server;