const mongoose = require("mongoose");
const { Schema } = mongoose;

const vesselOwnerSchema = new Schema(
  {
    com_id: { type: String, required: false },
    company_shortname: { type: String, required: false },
    company_name: { type: String, required: false },
    phoneno: { type: String, required: false },
    email: { type: String, required: false },
    address: { type: String, required: false },
    country: { type: String, default: "India", required: true },
    cperson_prefix: { type: String, required: false },
    contactperson: { type: String, required: false },
    crewing_department1: { type: String, required: false },
    crewing_department11: { type: String, required: false },
    phonecrewing_department1: { type: String, required: false },
    crewemail1: { type: String, required: false },
    accounts_department1: { type: String, required: false },
    accounts_department11: { type: String, required: false },
    phoneaccounts_department1: { type: String, required: false },
    email_accountdep1: { type: String, required: false },
    cdate: { type: String, required: false },
    reason: { type: String, required: false },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("VesselOwner", vesselOwnerSchema);
