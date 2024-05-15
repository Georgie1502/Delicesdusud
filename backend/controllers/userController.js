import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// login user

const loginUser = async (req , res)=>{
    const {email,password}= req.body;
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(404).json({success:false,message:"Informations d'identification invalides"})
            
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) {
            return res.status(401).json({success:false,message:"Informations d'identification invalides"})
        }
        const token = createToken(user._id);
        res.status(200).json({success:true,token})

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:"Error"})
    }

}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

//register user

const registerUser = async (req,res)=>{
    const {name,password,email}= req.body;
    try {
        //checking is user already exists
        const exists = await userModel.findOne({email});
        if(exists){
            return res.status(400).json({success:false,message:"Erreur d'enregistrement"})
        }
        //validating email format & strong password
        if(!validator.isEmail(email)){
            return res.status(400).json({success:false,message:"Veuillez entrer un email valide "})
        }
        if(password.length<8){
            return res.status(400).json({success:false,message: "Veuillez saisir un mot de passe fort"})
        }

        // Validate password strength
        if (!validator.isStrongPassword(password)) {
        return res.status(400).json({
          success: false,
          message: "Le mot de passe doit contenir au moins 8 caractères, une lettre minuscule, une lettre majuscule, un chiffre et un symbole spécial.",
        });
        }
        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword,
            admin,
            
        })
        const user = await newUser.save()

        const token = createToken(user._id)

    // Send a successful response with the token
        res.status(200).json({success:true,token});

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Erreur d'enregistrement" });
        
    }

}

export {loginUser,registerUser}
