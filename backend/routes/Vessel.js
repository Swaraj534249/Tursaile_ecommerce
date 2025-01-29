const express=require('express')
const vesselController=require("../controllers/Vessel")
const router=express.Router()

router
    .post("/",vesselController.create)
    .get("/",vesselController.getAll)
    .get("/:id",vesselController.getById)
    .get("/vesselOwner/:id",vesselController.getByVesselOwnerId)
    .patch("/:id",vesselController.updateById)
    .patch("/undelete/:id",vesselController.undeleteById)
    .delete("/:id",vesselController.deleteById)

module.exports=router