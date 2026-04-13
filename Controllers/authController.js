import userModel from "../Model/userModel.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    //validation
    if (!name || !email || !password || !phone || !address) {
      return res.status(400).send({
        success: false,
        message: "Please provide all the details",
      });
    }
    //existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //save user
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });
    await user.save();
    user.password = undefined;

    return res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in Registration",
      success: false,
      error: error.message,
    });
  }
};

// login controller

export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide all the details",
      });
    }
    //existing user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    //password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    return res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      user,
    });     

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in Login",
      success: false,
      error: error.message,
    });   
  }    
    
  }

  //update user 
  
export const updateProfileController = async (req, res) => {
  try {
    const {id} = req.params;
    if(!id){
      return res.status(400).send({
        success:false,
        message:"User id is required"
      })
    }
    const user = await userModel.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
      },
      { new: true }
    );
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in updating profile",
      success: false,
      error: error.message,
      });   
    }
  };

  // delete user id 

  export const deleteUserController = async (req, res) => {
    try {
      const {id} = req.params;
      if(!id){
        return res.status(400).send({
          success:false,
          message:"User id is required"
        })
      }
      await userModel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "User Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error in deleting user",
        success: false,
        error: error.message,
        });   
      }
    }
    