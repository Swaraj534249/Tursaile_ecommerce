const mongoose = require("mongoose");
const { Schema } = mongoose;

const vesselManagerSchema = new Schema(
  {
    managerName: { type: String, required: false },
    managerShortName: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    title: { type: String, required: false },
    personName: { type: String, required: false },
    email: { type: String, required: false },
    address: { type: String, required: false },
    country: { type: String, default: "India", required: false },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("VesselManager", vesselManagerSchema);
