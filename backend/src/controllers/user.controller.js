
import { User } from "../models/user.model.js";

const registerUser  = async (req,res) =>{
    try {
        
        const {username,email,password } = req.body;
         
        // validation
        if(!username || !email || !password){
            return res.status(400).json({message : "ALl fields are important !"})
        }

        //    check if user exits 
    const existing = await User.findOne({email:email.toLowerCase()});
        if(existing){
            return res.status(400).json({message:"User already exists"});
        }


        // create a User 
        const user = await User.create({
            username,
            email:email.toLowerCase(),
            password,
            loggedIn:false,
        });

        res.status(201).json({
            message:"User registered ",
            user:{id:user._id,email:user.email,username:user.username}
        });
    } catch (error) {
        return res.status(500).json({message:"Internal server error ",error:error.message})
    }
}
const loginUser = async (req,res) => {

   try {
    
     const { email, password} = req.body;

    const user = await User.findOne({
       email: email.toLowerCase()
    });
    //if user doesnot exists 
    if(!user)
        return res.status(400).json({message:"User not found"});
    


    //match the passwords 
    const isMatch = await user.comparePassword(password);
    if(isMatch) return res.status(400).json({
        message:"Invalid Credentials"
    });

    res.status(200).json({
        message:"user Loggin in",
        user:{

            id:user._id,
            email:user.email,
            username:user.username
        }
    });
   } catch (error) {
     return res.status(500).json({
        message:"Internal server errroror"
     })
   }
}

const logoutuser = async (req,res) =>{
      try {
        
        const {email} = req.body;

        const user = User.findOne({
            email
        })

        if(!user){
            res.status(400).json({
                message:"User not Found"
            })
        }

        res.status(200).json({
            message:"User logged out successfully"
        })

      } catch (error) {
        res.status(500).json({
            message:"Internal Server Erririr"
        })
      }
}
export{
    registerUser,
    loginUser,
    logoutuser
}

