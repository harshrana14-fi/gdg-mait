import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

export const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);
