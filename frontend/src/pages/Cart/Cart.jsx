import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';

const Cart = () => {
  const { cartItems, food_list, removeFromCart } = useContext(StoreContext);

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Titre</p>
          <p>Prix</p>
          <p>Quantité</p>
          <p>Total</p>
          <p>Supprimer</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index} className="cart-items-title cart-items-item">
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.price}€</p>
                <p>{cartItems[item._id]}</p>
                <p>{item.price * cartItems[item._id]}€</p>
               
                <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Cart;
