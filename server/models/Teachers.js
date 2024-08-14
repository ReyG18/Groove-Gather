const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nextFestival: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  grooves: {
    type: [String], 
  },
  experience: {
    type: Number,
    required: true,
  },
  classes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  id: false
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
