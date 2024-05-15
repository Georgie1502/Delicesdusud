import foodModel from "../models/foodModel.js";

import fs from 'fs'

//add food item

const addFood = async (req,res)=>{
    let image_filename = `${req.file.filename}`;
    try {
        const existingFood = await foodModel.findOne({ name: req.body.name});
        if(existingFood){
            return res.json({ success:false, message: "L'aliment existe déjà dans la base de données"})
        }
    } catch (error) {
        return res.json({ succes:false, message:"Erreur dans la vérification"})
        
    }

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        activated:req.body.activated,
        image:image_filename
    })

    try {
        await food.save();
        res.json({succes:true,message:'Succès'})
    } catch (error) {
        console.log(error)
        res.status.json({succes:false,message:"Erreur lors de l'enregistrement des aliments dans la base de données"})
        
    }

}

//all food list
const listFood = async (req,res)=>{
    try {
        const foods= await foodModel.find({});
        res.json({succes:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({succes:false,message:"Error"})
        
    }

}
//remove food item 
const removeFood = async (req,res)=>{
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({succes:true,message:"Aliments enlevés"})
    } catch (error) {
        console.log(error);
        res.json({succes:false,message:"Error"})
    }

}

// Mettre à jour le statut d'activation d'un aliment
const updateFoodActivation = async (req, res) => {
    try {
      const food = await foodModel.findById(req.body.id);
  
      if (!food) {
        return res.status(404).json({ success: false, message: "Aliment non trouvé" });
      }
  
      // Inverser le statut d'activation
      food.activated = !food.activated;
  
      const updatedFood = await food.save();
  
      res.json({ success: true, data: updatedFood });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Erreur lors de la mise à jour de l'aliment" });
    }
  };
  
export {addFood,listFood,removeFood,updateFoodActivation}