import React, { useEffect, useState} from 'react'
import './List.css'
import axios from "axios"
import { toast } from 'react-toastify';

const List = ({url}) => {
 
  const [list,setList]=useState([]);

  const fetchList=async ()=>{
    const response = await axios.get(`${url}/api/food/list`);
      if(response.data.succes){
      setList(response.data.data);
    }else {
      toast.error("Error")
    }
  }
  const removeFood = async(foodId)=>{
    //console.log(foodId)
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList();
    if(response.data.succes){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error")
    }

  }
  const updateFoodActivation = async(foodId) =>{
    const response = await axios.put(`${url}/api/food/:id/activation`,{id:foodId});
    await fetchList();
    if(response.data.succes){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error")
    }
  }
  useEffect(()=>{
    fetchList();
  },[])
  return (
    <div className='list add flex-col'> 
    <p>La liste des repas</p>
    <div className="list-table">
      <div className="list-table-format title">
          <b>Image</b>
          <b>Nom</b>
          <b>Categorie</b>
          <b>Prix</b>
          <b>Activated</b>
          <b>Action</b>
          
      </div>
      {list.map((item,index)=>{
    
        return(
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/`+item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}€</p>
           
            <p onClick={()=>removeFood(item._id)} className='cursor'>x</p>
            <button onClick={()=>updateFoodActivation(item._id)}>desactived</button>
            <p>{item.activated}€</p>

          </div>
        )

      })}
    </div>

    </div>
  )
}

export default List