import JWT from "jsonwebtoken";

export const authMiddlewere = async (req , res, next)=>{
    try {
        const token = req.headers.authorization
        if (!token){
            return res.status(402).send({
                success:false,
                message:"Unauthorized Access No token provided",
            })
        }
        const decode = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success:false,
            message:"Unauthorized Access",
            error,
        })
    }
}

export const isAdmin  = async (req, res, next)=>{
    try {
        const user = await userModel.findById(req.user._id);
        if (user.isAdmin !== true){
            return res.status(401).send({
                success:false,
                message:"Unauthorized Access Admins Only",
            })
        }
        
    } catch (error) {
        console.log(error);
        return res.status(401).send({
          success: false,
          message: "Unauthorized Access",
          error,
        }); 
    }
}