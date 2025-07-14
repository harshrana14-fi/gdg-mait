import mongoose from 'mongoose';

const SocietySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const Society = mongoose.models.Society || mongoose.model('Society', SocietySchema);
