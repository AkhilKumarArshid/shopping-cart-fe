import useImage from "../hooks/useImage";
import { useState } from "react";

function CartItem(props) {
    const {image} = useImage(props.imageName);
    const [selected, setSelected] = useState(props.selected);
    const [totalPrice, setTotalPrice] = useState(props.totalPrice);
    const [check, setCheck] = useState(true);

    const incDecItem = (e) => {
      props.handleItemIncDec(e.target.value, props.name);
      if (e.target.value === "add") {
        setSelected(selected + 1);
        setTotalPrice(totalPrice + props.price);
      }
      if (e.target.value === "dec") {
        setSelected(selected - 1);
        setTotalPrice(totalPrice - props.price);
      }
    };

    const handleRemoveItem = () => {
        props.handleRemoveItem(props.name);
    }

    const handleCheckbox = (e)=> {
      setCheck(!check);
      props.itemCheck({...props, checked:e.target.checked});
    }
 
    return (
        <div className="cart-item">
            <div className="cart-item-details">
            <img className="cart-item-img" src={image} alt="cart-item-img"/>
            <div className="cart-item-name">{props.name}</div>
            <div className="cart-item-price">{props.price}</div>
            <div className="cart-item-quantity">Left: {props.quantity}</div>
            <div className="cart-select-total">
                {selected > 1 && <button onClick={(e)=>incDecItem(e)} className="add-remove-btn" value={"dec"}>-</button>}
                <div className="cart-selected">Selected: {selected}</div>
                <div className="cart-item-total">Total Price: {totalPrice}</div>
                {selected < props.quantity && <button onClick={(e)=>incDecItem(e)} className="add-remove-btn" value={"add"}>+</button>}
            </div>
            <button className="remove-item" onClick={()=>handleRemoveItem()}>Remove from cart</button>
        </div>
        <input type={"checkbox"} onClick={(e)=>handleCheckbox(e)} checked={check}/>
        </div>
        
    );
}

export default CartItem