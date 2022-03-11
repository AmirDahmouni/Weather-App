const axios=require("axios")

exports.current=async(req,res,next)=>{
    try{
        const {data} = await axios.get(
            "https://api.openweathermap.org/data/2.5/onecall?",
            {
              params: {
                lat: req.body.coordinates.lat,
                lon: req.body.coordinates.lng,
                exclude: "minutely,hourly,alerts",
                appid: "1b825daf58d455d1161c0dd1607a1aec",
                units: "metric"
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