const express=require('express')
const crewController=require("../controllers/Crew")
const router=express.Router()

router
    .post("/",crewController.create)
    .get("/",crewController.getAll)
    .get("/:id",crewController.getById)
    .get("/rank/:rank",crewController.getByRank)
    .patch("/:id",crewController.updateById)
    .patch("/undelete/:id",crewController.undeleteById)
    .delete("/:id",crewController.deleteById)

module.exports=router