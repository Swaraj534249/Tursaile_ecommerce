const { Schema, default: mongoose } = require("mongoose")
const Crew = require("../models/Crew")

exports.create=async(req,res)=>{
    try {
        const created=new Crew(req.body)
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
        let limit=100

        if(req.query.user){
            filter['isDeleted']=false
        }

        if(req.query.page && req.query.limit){

            const pageSize=req.query.limit
            const page=req.query.page

            skip=pageSize*(page-1)
            limit=pageSize
        }

        const totalDocs=await Crew.find(filter).countDocuments().exec()
        const results=await Crew.find(filter).skip(skip).limit(limit).exec()

        console.log(results);
        

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
        const result=await Crew.findById(id)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error getting Vessel Owner details, please try again later'})
    }
}

exports.getByRank=async(req,res)=>{
    try {

        let limit=50
        // const {id}=req.params
        const {rank} = req.params;        
        const result = await Crew.find({rankname: rank}).limit(limit);
        // const result = await Vessel.find({});
        // console.log(result);
        
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error fetching cart items, please trying again later'})
    }
}

exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        const updated=await Crew.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error updating Vessel Owner, please try again later'})
    }
}

exports.undeleteById=async(req,res)=>{
    try {
        const {id}=req.params
        const unDeleted=await Crew.findByIdAndUpdate(id,{isDeleted:false},{new:true})
        res.status(200).json(unDeleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error restoring Vessel Owner, please try again later'})
    }
}

exports.deleteById=async(req,res)=>{
    try {
        const {id}=req.params
        const deleted=await Crew.findByIdAndUpdate(id,{isDeleted:true},{new:true})
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error deleting Vessel Owner, please try again later'})
    }
}


