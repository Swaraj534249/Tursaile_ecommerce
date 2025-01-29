const mongoose=require("mongoose")
const {Schema}=mongoose

const vesselSchema= new Schema({
    vesselOwner:{
        type:Schema.Types.ObjectId,
        ref:"VesselOwner",
        required:true },
    vesselname: { type: String, required: true },
    vessel_category: { type: String, required: true },
    vesseltype: { type: String, required: true },
    imo_Number: { type: String, required: true },
    grt: { type: String },
    bhp: { type: String },
    bhp2: { type: String },
    flag: { type: String },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true,versionKey:false})

module.exports=mongoose.model('Vessel',vesselSchema)