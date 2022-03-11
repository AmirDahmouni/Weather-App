const User=require("../models/User")
const bcrypt=require("bcrypt")
//Create User
exports.register= async (req, res,next) => {
    try{
      let user = await User.findOne({email: req.body.email});
      if (user) return res.status(400).send({ message: 'invalid email' });
      
      if(req.body.password!==req.body.repassword) return res.status(400).send({message:"invalid rePassword "})
      user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      const newUser = await user.save();
      //return newUser fields
      if (newUser)         
        return res.status(201).send({_id: newUser._id,username: newUser.name,email: newUser.email});
      else 
        return res.status(401).send({ message: 'Invalid User Data' });
    }
      catch(ex)
      {
        next(ex.message)
      }
    
  }
  
  // login user with (email & password)
exports.signin=async (req, res,next) => {
    try{
    const signinUser = await User.findOne({
      email: req.body.email
    });
    if (!signinUser) return res.status(404).send({ message: 'invalid email' });
    const validpassword = await bcrypt.compare(req.body.password, signinUser.password)
    if(!validpassword) return res.status(401).send({ message: 'Invalid Password.' });
    
    return res.send({
        _id: signinUser.id,
        name: signinUser.name,
        email: signinUser.email,
        favoris:signinUser.favoris,
        token:signinUser.generateAuth()
       
      });
    }
    catch(ex)
    {
      next(ex.message)
    }
  }

exports.addfavoris=async(req,res,next)=>{
  try{
    const user = await User.findByIdAndUpdate(req.user._id,{$push: {favoris: {long: req.body.long,
                                             lat:req.body.lat,city:req.body.city,country:req.body.country}}})
    if(user) return res.status(200).send(user)
    else return res.status(404).send("user not found")
  }
  catch(ex){
    next(ex.message)
  }

}

exports.removefavoris=async(req,res,next)=>{
  try{
    const user = await User.findByIdAndUpdate(req.user._id,{ $pull: { favoris: {  city:req.body.city } } })
    if(user) return res.status(200).send(user)
    else return res.status(404).send("user not found")
  }
  catch(ex){
    next(ex.message)
  }
}