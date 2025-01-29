const { Schema, default: mongoose } = require("mongoose")
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const Propose = require("../models/Propose")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "form1/"); // Save files in the "uploads" folder
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName); // Use a timestamp to ensure unique filenames
    },
});

// Middleware for file upload
const upload = multer({ storage });

exports.uploadForm1 = upload.single("form1");

exports.create=async(req,res)=>{
    try {

        const { vesselOwner, vessel, rank, crew, crewingAgent, remark, approval } = req.body;

        const newPropose = new Propose({
            vesselOwner,
            vessel,
            rank,
            crew,
            crewingAgent,
            remark,
            approval,
            form1: req.file ? { filePath: req.file.path, fileName: req.file.filename } : null,
        });

        // console.log(newPropose);
        
        await newPropose.save();

        // const created=new Propose(req.body)        
        // await created.save()
        res.status(201).json(newPropose)
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

        const totalDocs=await Propose.find(filter).countDocuments().exec()
        const results=await Propose.find(filter).populate("vesselOwner").populate("vessel").populate("crew").populate("crewingAgent").skip(skip).limit(limit).exec()

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
        const result=await Propose.findById(id).populate("vesselOwner").populate("vessel").populate("crew").populate("crewingAgent")        
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error getting Vessel Owner details, please try again later'})
    }
}

exports.getByFilename=async(req,res)=>{
    try {
        const fileName = req.params.filename;
        const filePath = path.join(__dirname, '../form1', fileName);
        // console.log(filePath);

        if (!fs.existsSync(filePath)) {
            console.log('File not found');
            return res.status(404).send('File not found');
          }
        
        res.download(filePath, fileName, (err) => {
            if (err) {
            res.status(500).send('File not found');
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error getting Vessel Owner details, please try again later'})
    }
}

exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        const updated=await Propose.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error updating Vessel Owner, please try again later'})
    }
}

exports.undeleteById=async(req,res)=>{
    try {
        const {id}=req.params
        const unDeleted=await Propose.findByIdAndUpdate(id,{isDeleted:false},{new:true})
        res.status(200).json(unDeleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error restoring Vessel Owner, please try again later'})
    }
}

exports.deleteById=async(req,res)=>{
    try {
        const {id}=req.params
        const deleted=await Propose.findByIdAndUpdate(id,{isDeleted:true},{new:true})
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error deleting Vessel Owner, please try again later'})
    }
}


