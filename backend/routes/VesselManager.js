const express=require('express')
const vesselManagerController=require("../controllers/VesselManager")
const router=express.Router()

router
    .post("/",vesselManagerController.create)
    .get("/",vesselManagerController.getAll)
    .get("/:id",vesselManagerController.getById)
    .patch("/:id",vesselManagerController.updateById)
    .patch("/undelete/:id",vesselManagerController.undeleteById)
    .delete("/:id",vesselManagerController.deleteById)

module.exports=router