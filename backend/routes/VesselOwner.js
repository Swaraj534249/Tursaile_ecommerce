const express=require('express')
const vesselOwnerController=require("../controllers/VesselOwner")
const router=express.Router()

router
    .post("/",vesselOwnerController.create)
    .get("/",vesselOwnerController.getAll)
    .get("/:id",vesselOwnerController.getById)
    .patch("/:id",vesselOwnerController.updateById)
    .patch("/undelete/:id",vesselOwnerController.undeleteById)
    .delete("/:id",vesselOwnerController.deleteById)

module.exports=router