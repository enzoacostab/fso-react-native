import mongoose from "mongoose";

const Schema = mongoose.Schema({
  id: String,
  fullName: String,
  description: String,
  language: String,
  forksCount: Number,
  stargazersCount: Number,
  ratingAverage: Number,
  reviewCount: Number,
  ownerAvatarUrl: String
});


export default mongoose.model('Repository', Schema)