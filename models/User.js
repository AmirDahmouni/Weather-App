const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  favoris: [{long:Number,lat:Number,city:String,country:String}]
});

userSchema.methods.generateAuth = function () {
  return jwt.sign({ _id: this._id, username: this.username, favorites: this.favorites },config.get("JWT_SECRET"));
};
const User = mongoose.model("user", userSchema);

module.exports= User;