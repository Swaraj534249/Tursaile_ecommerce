const { Schema, default: mongoose } = require("mongoose")
const Vessel = require("../models/Vessel")

exports.create=async(req,res)=>{
    try {
        const created=new Vessel(req.body)
        await created.save()
        res.status(201).json(created)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error adding Vessel Owner, please trying again later'})
    }
}

exports.getAll = async (req, res) => {
    try {
        const filter={}
        let skip=0
        let limit=0

        if(req.query.user){
            filter['isDeleted']=false
        }

        if(req.query.page && req.query.limit){

            const pageSize=req.query.limit
            const page=req.query.page

            skip=pageSize*(page-1)
            limit=pageSize
        }

        const totalDocs=await Vessel.find(filter).countDocuments().exec()
        const results=await Vessel.find(filter).skip(skip).limit(limit).exec()

        // console.log(results);
        

        res.set("X-Total-Count",totalDocs)

        res.status(200).json(results)
    
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error fetching Vessel Owner, please try again later'})
    }
};

exports.getById=async(req,res)=>{
    try {
        const {id}=req.params
        const result=await Vessel.findById(id)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error getting Vessel Owner details, please try again later'})
    }
}

exports.getByVesselOwnerId=async(req,res)=>{
    try {
        const {id}=req.params
        
        const result = await Vessel.find({vesselOwner: id}).populate("vesselOwner");
        // const result = await Vessel.find({});        
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error fetching cart items, please trying again later'})
    }
}

exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        const updated=await Vessel.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error updating Vessel Owner, please try again later'})
    }
}

exports.undeleteById=async(req,res)=>{
    try {
        const {id}=req.params
        const unDeleted=await Vessel.findByIdAndUpdate(id,{isDeleted:false},{new:true})
        res.status(200).json(unDeleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error restoring Vessel Owner, please try again later'})
    }
}

exports.deleteById=async(req,res)=>{
    try {
        const {id}=req.params
        const deleted=await Vessel.findByIdAndUpdate(id,{isDeleted:true},{new:true})
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error deleting Vessel Owner, please try again later'})
    }
}


