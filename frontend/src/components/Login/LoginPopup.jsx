import React from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopup = ({setShowLogin}) => {
  const {url,setToken}= useContext(StoreContext)
  const[currState,setCurrState]=useState("Connexion")
  const [data,setData]=useState({
    name:"",
    email:"",
    password:""

  })

  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))

  }

  const onLogin = async (e)=>{
    e.preventDefault();
    let newUrl= url;
    if (currState === "Connexion") {
      newUrl +="/api/user/login"
      
    }
    else{
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl,data);
    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      setShowLogin(false)
    }else{
      alert(response.data.message)
    }





  }


  return (
    <div className='login-popup'>
     <form onSubmit={onLogin} className="login-popup-container">
      <div className="login-popup-title">
        <h2>
          {currState}
        </h2>
        <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="icon" />
      </div>
      <div className="login-popup-inputs">
        {currState==="Connexion"?<></>: <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Votre nom' required/>}
       
        <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Votre email' required/>
        <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Votre mot de passe' required/>
      </div>
      <button type='text'>{currState ==="S'enregistrer"? "Crée un compte":"Connexion"}</button>
      <div className="login-popup-condition">
        <input type="checkbox" required/>
        <p>En continuant, j'accepte les conditions d'utilisation et la politique de confidentialité.</p>

      </div>
      {currState ==="Connexion"?   
      <p>Créer un nouveau compte? <span onClick={()=>setCurrState("S'enregistrer")}>Clik ici</span></p>
      : <p>Vous avez déjà un compte? <span onClick={()=>setCurrState("Connexion")}>Connexion ici</span></p>
    }
   
     
     </form>

    </div>
  )
}

export default LoginPopup