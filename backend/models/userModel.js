const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  age: { type: Number, required: false },
  address: { type: String, required: false },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Reader', 'Author'], required: true },
  borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  writtenBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  profile: { type: Object }  // Add profile field to store profile details
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
