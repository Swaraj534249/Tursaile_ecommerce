const mongoose=require("mongoose")
const {Schema}=mongoose

const proposeSchema= new Schema({
    vesselOwner:{
        type:Schema.Types.ObjectId,
        ref:"VesselOwner",
        required:true },
    vessel:{
        type:Schema.Types.ObjectId,
        ref:"Vessel",
        required:true },
    rank:{
        type:String,
        ref:"Rank",
        required:true },
    crew:{
        type:Schema.Types.ObjectId,
        ref:"Crew",
        required:true },
    crewingAgent:{
        type:Schema.Types.ObjectId,
        ref:"CrewingAgent",
        required:true },
    // form1: { type: Object, required: false },
    form1: {
        type: {
          fileName: { type: String, required: false },
          filePath: { type: String, required: false },
          fileType: { type: String, required: false },
          fileSize: { type: Number, required: false }, // Optional
        },
        required: false,
      },
    remark:{
        type:String,
        default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true,versionKey:false})

module.exports=mongoose.model('Propose',proposeSchema)