import React, { useState,useContext, Profiler } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'


const Navbar = ({setShowLogin}) => {
    const [menu, setMenu]=useState("Accueil");
    const {token,setToken}= useContext(StoreContext);
    const navigate = useNavigate();
    const logout = ()=>{
      localStorage.removeItem("token");
      setToken("");
      navigate("/")


    }

  return (
    <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt="" className='logo' /></Link>
        <ul className="navbar-menu">
            <Link to={'/'} onClick={()=>setMenu("Accueil")} className={menu === "Accueil"?"active": ""}>Accueil</Link>
            <a href='#explore-menu' onClick={()=>setMenu("Menu")} className={menu === "Menu"?"active": ""}>Menu</a>
            <a href='#app-download' onClick={()=>setMenu("Mobile-app")} className={menu === "Mobile-app"?"active": ""}>Mobile-app</a>
            <a href='#footer' onClick={()=>setMenu("Contactez-nous")} className={menu === "Contactez-nous"?"active": ""}>Contactez-nous</a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
               <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                <div className="dot"></div>
            </div>
            {!token ? <button onClick={()=>setShowLogin(true)}>Conectez-vous</button>
            :<div className='navbar-profile'> 
            <img src={assets.profile_icon} alt="profil photo" />
            <ul className="nav-profile-dropdown">
              <li><img src={assets.bag_icon} alt="icon bag" />Commandes</li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="icon logout" />Déconnexion</li>
            </ul>
            </div>}
           
            
        </div>

    </div>
  )
}

export default Navbar