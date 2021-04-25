const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 32,
  },

  lastName: {
    type: String,
    trim: true,
    maxLength: 32,
  },

  email: {
    type: String,
    required: true,
    maxLength: 5,
    trim: true,
    unique: true,
  },

  encry_password: {
    type: String,
    required: true,
  },

  role: {
    type: Number,
    default: 0,
  },

  salt: String,

  purchases: {
    type: Array,
    default: [],
  },
});

UserSchema.virtual("password")
  .get(function () {
    return this._password;
  })
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.secure_password(password);
  });

UserSchema.methods = {
  authenticate: function (plainPassword) {
    return this.secure_password(plainPassword) === this.encry_password;
  },

  secure_password: function (plainPassword) {
    if (!plainPassword) return "";

    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", UserSchema);
