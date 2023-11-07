const mongoose = require('mongoose');

const workExperienceSchema = new mongoose.Schema({
  position: String,
  company: String,
  location: String,
  startDate: Date,
  endDate: Date,
  description: String,
});

const educationSchema = new mongoose.Schema({
  degree: String,
  college: String,
  location: String,
  graduationDate: Date,
});

const WorkExperience = mongoose.model('WorkExperience', workExperienceSchema);
const Education = mongoose.model('Education', educationSchema);

module.exports = {
  WorkExperience,
  Education,
};
