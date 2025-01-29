const { Schema, default: mongoose } = require("mongoose")
const VesselManager = require("../models/VesselManager")

exports.create=async(req,res)=>{
    try {
        const created=new VesselManager(req.body)
        await created.save()
        res.status(201).json(created)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error adding Vessel Manager, please trying again later'})
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

        const totalDocs=await VesselManager.find(filter).countDocuments().exec()
        const results=await VesselManager.find(filter).skip(skip).limit(limit).exec()

        res.set("X-Total-Count",totalDocs)

        res.status(200).json(results)
    
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error fetching Vessel Manager, please try again later'})
    }
};

exports.getById=async(req,res)=>{
    try {
        const {id}=req.params
        const result=await VesselManager.findById(id)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error getting Vessel Manager details, please try again later'})
    }
}

exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        const updated=await VesselManager.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error updating Vessel Manager, please try again later'})
    }
}

exports.undeleteById=async(req,res)=>{
    try {
        const {id}=req.params
        const unDeleted=await VesselManager.findByIdAndUpdate(id,{isDeleted:false},{new:true})
        res.status(200).json(unDeleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error restoring Vessel Manager, please try again later'})
    }
}

exports.deleteById=async(req,res)=>{
    try {
        const {id}=req.params
        const deleted=await VesselManager.findByIdAndUpdate(id,{isDeleted:true},{new:true})
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error deleting Vessel Manager, please try again later'})
    }
}


