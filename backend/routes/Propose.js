const express=require('express')
const proposeController=require("../controllers/Propose")
const router=express.Router()

router
    .post("/",proposeController.uploadForm1,proposeController.create)
    .get("/",proposeController.getAll)
    .get("/:id",proposeController.getById)
    .patch("/:id",proposeController.updateById)
    .patch("/undelete/:id",proposeController.undeleteById)
    .delete("/:id",proposeController.deleteById)
    .get("/form1/:filename",proposeController.getByFilename)

module.exports=router