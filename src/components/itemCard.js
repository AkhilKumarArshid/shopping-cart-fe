import { useEffect, useState } from "react";
import useImage from "../hooks/useImage";

function ItemCard(props) {

    const [selected, setSelected] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const {image} = useImage(props.imageName);

    useEffect(()=>{
        if(props.selected && props.totalPrice) {
            setSelected(props.selected);
            setTotalPrice(props.totalPrice);
        }
    },[]);


    const handleAddToCart = (event)=> {
        let select = selected +1;
        let price = totalPrice + props.price;
        setSelected(select);
        setTotalPrice(price);

        props.itemSelected({...props, selected:select, totalPrice:price});
        event.preventDefault();
    }

    return(
        <div className="item-card">
            <img className="item-image" src={image} alt="item"/>
            <div className="item-name">{props.name}</div>
            <div className="item-description">{props.description}</div>
            <div className="item-price">Rs {props.price}</div>
            <div className="left">Left: {props.quantity}</div>
            <div className="select-total">
            <span className="selected"> selected: {selected}</span>
            <span className="total-price">Total Price: {totalPrice}</span>
            </div>
           
            <button className="add-to-cart" onClick={handleAddToCart} > Add to cart</button>
        </div>
    );
}

export default ItemCard