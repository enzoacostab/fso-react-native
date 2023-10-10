import mongoose from "mongoose";

const Schema = mongoose.Schema({
  username: {
    type: String, 
    unique: true, 
    minlength: 3
  },
  passwordHash: String,
},)

export default mongoose.model('User', Schema)