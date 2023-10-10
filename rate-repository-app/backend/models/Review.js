import mongoose from "mongoose";

const Schema = mongoose.Schema({
  repositoryId: String,
  text: String,
  rating: Number,
  createdAt: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});


export default mongoose.model('Review', Schema)