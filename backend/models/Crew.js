const mongoose=require("mongoose")
const {Schema}=mongoose

const crewSchema= new Schema({
    name: { type: String, required: true },
    email: { type: String },
    mobile: { type: String },
    indosno: { type: String},
    passport: { type: String},
    rankname: { type: String },
    purpose: { type: String },
    cdc: { type: String },
    coc: { type: String },
    salary: { type: String },
    document: { type: String },
    image: { type: String },
    passport_upload: { type: Date },
    cdc_upload: { type: String },
    type: { type: String },
    addedby: {type : String},
    documentsr: { type: String },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true,versionKey:false})

module.exports=mongoose.model('Crew',crewSchema)