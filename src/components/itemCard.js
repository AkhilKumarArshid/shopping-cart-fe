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
        let op = event.target.value;
        let select = selected;
        let price = totalPrice;

        if(op==="dec") {
            select = selected -1;
            price = totalPrice - props.price;
        } else {
            select = selected +1;
            price = totalPrice + props.price;
        }

        setSelected(select);
        setTotalPrice(price);
        props.itemSelected({...props, selected:select, totalPrice:price});
    }

    return(
        <div className="item-card">
            <img className="item-image" src={image} alt="item"/>
            <div className="item-name">{props.name}</div>
            <div className="item-description">{props.description}</div>
            <div className="item-price">Rs {props.price}</div>
            <div className="left">Left: {props.quantity}</div>
            <div className="select-total">
                {!selected && <button className="add-to-cart" onClick={handleAddToCart} value="inc"> Add to cart</button>}
                {selected > 0 && <div className="itemSelection">
                    <button className="incDecBtn" onClick={handleAddToCart} value="dec">-</button>
                    <div>{selected}</div>
                    <button className="incDecBtn" onClick={handleAddToCart} value="inc">+</button>
                 </div>}
                <span className="total-price">Total Price: {totalPrice}</span>
            </div>
        </div>
    );
}

export default ItemCard