import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExpleroMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Regardez les menus</h1>
        <p className='expore-menu-text'>Découvrez l'essence de la cuisine argentine en un seul endroit. Explorez une sélection de nos meilleures spécialités, commandez en ligne et laissez-vous transporter par les saveurs authentiques d'Amérique du Sud.</p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>{
                return(
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>

                    </div>
                )
            })}
        </div>
            <hr>
            </hr>
    </div>
  )
}

export default ExpleroMenu