const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

module.exports = mongoose.models.admins || mongoose.model("admins", adminSchema);
