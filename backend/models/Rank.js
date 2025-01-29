const mongoose=require("mongoose")
const {Schema}=mongoose

const rankSchema= new Schema({
    rankname: { type: String,  },
    post: { type: Number,  }, 
    type: { type: String,  },
    subcategory: { type: String, },
    catagory: { type: String,  },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true,versionKey:false})

module.exports=mongoose.model('Rank',rankSchema)