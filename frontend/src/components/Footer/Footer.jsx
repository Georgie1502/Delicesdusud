import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="logo" />
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus, voluptatum optio dolorem assumenda, velit soluta accusantium quod fuga nesciunt animi neque doloribus expedita! Eaque consequatur assumenda nemo commodi, laborum ipsa?</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="facebook icon" />
                    <img src={assets.twitter_icon} alt="twitter icon" />
                    <img src={assets.linkedin_icon} alt="linkedin icon" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Accueil</li>
                    <li>Qui nous sommes</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Prendre contact avec nous</h2>
                <ul>
                    <li>+33 123 456 789</li>
                    <li>contact@delicesdusud.com</li>
                </ul>

            </div>
        </div>
        <hr />
        <p className='footer-copyright'>Copyright 2024 Delicedusud.com - Tous droits réservés </p>
    </div>
  )
}

export default Footer