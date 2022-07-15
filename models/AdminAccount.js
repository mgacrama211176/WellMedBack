import mongoose from 'mongoose';

const administrator = new mongoose.Schema({
  username: String,
  password: String,
});

const adminModel = mongoose.model('administrator', administrator);

export default adminModel;
