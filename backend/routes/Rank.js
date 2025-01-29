const express=require('express')
const rankController=require("../controllers/Rank")
const router=express.Router()

router
    .post("/",rankController.create)
    .get("/",rankController.getAll)
    .get("/:id",rankController.getById)
    .patch("/:id",rankController.updateById)
    .patch("/undelete/:id",rankController.undeleteById)
    .delete("/:id",rankController.deleteById)

module.exports=router