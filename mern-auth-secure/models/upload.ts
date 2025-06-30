import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
  email: { type: String, required: true },
  filename: { type: String, required: true },
  rows: { type: Number, required: true },
  date: { type: String, required: true },
  data: { type: Array, required: true }, // raw Excel data
});

// const Upload = mongoose.model("Upload", uploadSchema);
const Upload = mongoose.models.Upload || mongoose.model("Upload", uploadSchema);

export default Upload;
