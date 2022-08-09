const User = require("../Models/userModel");
const bcrypt = require("bcrypt");

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
  
    await User.create(req.body);
 
    res.status(200).json({ message: "User is successfully created"});
  } catch (e) {
    res.status(400).json({ message: "Error" });
    console.log(e.message)
  }
};
