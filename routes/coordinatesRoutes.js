const express = require('express')
const coordinatesController=require("../controllers/Coordinates")
const error=require("../middlewares/error")
const router = express.Router();



router.post('/getcoordsByAdress', coordinatesController.CoordinatesOfAddress,error);
router.post('/getAdressBycoords', coordinatesController.AdressOfCoords,error);

module.exports=router;