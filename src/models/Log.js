import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  tareaId: {
    type: Number,
    required: true,
  },
  accion: {
    type: String,
    required: true,
  },
  detalle: {
    type: String,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

const Log = mongoose.model("Log", logSchema);

export default Log;