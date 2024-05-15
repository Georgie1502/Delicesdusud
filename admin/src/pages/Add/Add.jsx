import React, { useState,useEffect } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'


const Add = ({url}) => {
    
    const[image,setImage]=useState(false);
    const [data,setData]=useState({
        name:"",
        description:"",
        price:"",
        category:"Asado"


    })
    const onChangeHandler=(event)=>{
        const name= event.target.name;
        const value= event.target.value;
        setData(data=>({...data,[name]:value}))
    }
    useEffect(()=>{
        console.log(data);
    },[data])

    const onSubmitHandler= async (event)=>{
        event.preventDefault();
        const formData= new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image)
        const response= await axios.post(`${url}/api/food/add`,formData);
        if(response.data.succes){
            setData({  
            name:"",
            description:"",
            price:"",
            category:""

            })
        setImage(false)
        toast.success(response.data.message)

        }else{
        toast.error(response.data.message)
        }


    }
  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
          <div className='add-img-upload flex-col'>
            <p>Upload Image</p>
            <label htmlFor="image">
                <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" name="" id="image" hidden required/>

          </div>
          <div className="add-product-name flex-col">
            <p>Nom</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Nom'/>
          </div>
         <div className="add-product-description flex-col">
            <p>Description</p>
            <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Ecrire le contenue ici'></textarea>

         </div>
         <div className="add-category-price">
            <div className="add-category flex-col">
                <p>Categorie</p>
                <select onChange={onChangeHandler} value={data.category} name="category" id="">

                   <option value="Empanadas">Empanadas</option>
                   <option value="Asado">Asado</option>
                   <option value="Deserts">Deserts</option>
                   <option value="Sandwich">Sandwich</option>
                   <option value="Les spécialités">Les spécialités</option>
                   <option value="Hamburgers">Hamburgers</option>
                   <option value="Boissons">Boissons</option>
                   <option value="Milanesas">Milanesas</option>
                </select>

            </div>
            <div className="add-price flex-col">
                <p>Prix</p>
                <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='$20'/>

            </div>
         </div>
        <button type='text'className='add-btn'>Ajouter</button>
        </form>
      
    </div>
  )
}

export default Add