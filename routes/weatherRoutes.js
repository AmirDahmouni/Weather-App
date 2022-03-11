const express = require('express')
const weatherController=require("../controllers/Weather")
const error=require("../middlewares/error")
const router = express.Router();



router.post('/current',weatherController.current,error);



module.exports=router;