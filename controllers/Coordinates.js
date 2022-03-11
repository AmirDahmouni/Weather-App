const axios=require("axios");


exports.CoordinatesOfAddress=async(req,res,next)=>{
    try{
        const{data}= await axios.get(
            "https://api.opencagedata.com/geocode/v1/json? ",
            {
              params: {
                key:"103fda4edfee402fa23d1d1e4d742132",
                q: req.body.address,
                language: "en"
              }
            }
          );
        
          return res.status(200).send(data)
    }
    catch(err)
    {
        next(err.message)
    }
    
    
}


exports.AdressOfCoords=async(req,res,next)=>{
    const {data} = await axios.get(
        "https://api.opencagedata.com/geocode/v1/json? ",
        {
          params: {
            key: "103fda4edfee402fa23d1d1e4d742132",
            q: `${req.body.lat}+${req.body.lng}`,
            language: "en"
          }
        }
      );
    
      return res.send(data)
}


