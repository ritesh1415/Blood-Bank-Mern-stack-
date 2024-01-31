import usermodel from "../Model/usermodel.js";
import bcrypt from 'bcryptjs';
import  jwt  from "jsonwebtoken";
const RegisterController = async (req, res) => {
    try {
        const existingUser = await usermodel.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already exists'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;

        const user = new usermodel(req.body);
        await user.save();

        return res.status(201).send({
            success: true,
            message: "User registered successfully",
            user,
        });

    } catch (error) {
        // Handle the error appropriately, e.g., log it or send an error response
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        });
    }
};
const LoginController = async (req, res) => {
    try {
        const user = await usermodel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }
        console.log('User Role in Database:', user.role);
        console.log('Role in Request:', req.body.role);

        //check for role
        if (user.role != req.body.role) {
            return res.status(500).send({
                success: false,
                message: "Role does not match"
            });
        }
        
        const comparepassword = await bcrypt.compare(req.body.password, user.password);

        if (!comparepassword) {
            return res.status(404).send({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: "1d" });

        return res.status(200).send({
            success: true,
            message: "Login successfully",
            token,
            user,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in login api",
            error
        });
    }
};
//get current user
const Currentuser=async(req,res)=>{
    try {
        const user=await usermodel.findOne({_id:req.body.userId})
        return res.status(200).send({
            success:true,
            message:"user find successfully",
            user
        })
    } catch (error) {
     console.log(error);
     return res.status(500).send({
        success:false,
        message:"unable to get user",
        error
     })   
    }
}

export  { RegisterController, LoginController,Currentuser };
