const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
     // find user if already existed
    const found = await User.findOne({ email: req.body.email });
    if (found) {
      return res.status(400).json({ message: "Email already taken" });
    }
    //check if password is equal to comfirm password 
  
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({ message: "Password do not match" });
    }
   
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    req.body.image = req.file.filename

    const token = await jwt.sign({
      data:{email:req.body.email},
      expiresAt:"1h"
    },process.env.JWTSECRET)
   

    await User.create(req.body);
    //  console.log(req.body);
    res.status(200).json({ message: "User is successfully created", token});
  } catch (e) {
    res.status(400).json({ message: "Error" });
    console.log(e.message)
  }
};


//Login
exports.login = async (req, res) => {
  try {
    const found = await User.findOne({ email: req.body.email });
 
    if (!found) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }
 
    const compare = await bcrypt.compare(req.body.password, found.password);
    if (compare === false) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }

    const token = await jwt.sign({
      data:{id: found._id, email: found.email},
      expiresAt:"1h"
    },process.env.JWTSECRET)
    res.status(200).json({ message: "Welcome", token});
  } catch (e) {
    res.status(400).json({ message: "Error" });
  }
};


exports.protect = (req,res, next)=>{
  try{
    const token = req.headers.authorization;
 
     if(!token){
      return res.status(401).json({ message: "please log in"})
     }

     jwt.verify(token, process.env.JWTSECRET,function(err, decoded){
      if(err){
        return res.status(400).json({ message: "Token Exprired"})
      }
      // console.log(decoded.data)
      req.user = decoded.data
      console.log(req.user)
     });
  next();
}catch(e){
 console.log(e)
  }
}



exports.changePassword= async(req, res)=>{
  try{
  // check the user in DB
  const found = await User.findOne({ email: req.user.email });
  //  console.log(found)
   if(!found){
      return res.status(404).json({ message: "User does not exist" });
   }
  //old password == hashed password inside the DB
  const compare = await bcrypt.compare(req.body.oldPassword, found.password)
  if(compare == false){
      return res.status(404).send({message: "password is incorrect"});
  }
  //new passsword > 7 characters
  if(req.body.newPassword.length < 7){
      return res.status(404).send({message: "Password must be at least 7 characters"});
  }
  
  // new password != old password
  if(req.body.newPassword == req.body.oldPassword ){
  return res.status(404).send({message: "try different password"});
  }
  // confirn password
  if(req.body.newPassword != req.body.confirmNewPassword){
      return res.status(404).send({message: " password does not match"});
  }
  //update password
  const hashedPassword= await bcrypt.hash(req.body.newPassword,10)
  // req.body.newPassword = hashedPassword;
  
    // user.Password =  req.body.newPassword
  
    await User.findOneAndUpdate(
      {email: req.user.email},
       {password: hashedPassword });
       res.status(200).json({message: "password updated successfully"});
  }catch(err){
      console.log(e.message)
      res.status(404).json({message:err.message});
  }
  }
  