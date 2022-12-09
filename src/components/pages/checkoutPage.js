import { useContext } from "react";
import { cartItemsContext } from "../../App";
import CheckoutItem from "../checkoutItem"; 
import { useNavigate } from "react-router-dom";
import { updateProducts } from "../../service/products";

function CheckoutPage() {
  const {setProducts, cartProducts} = useContext(cartItemsContext);
  let totalPrice = 0;
  const navigate = useNavigate();
  for(let item of cartProducts) {
    if(item.checked) totalPrice = totalPrice + item.totalPrice;
  }

  const backToCart = ()=> {
    navigate("/cart");
  }

  const backToHome = ()=> {
    updateProducts(cartProducts).then((response)=> {
      let updatedItems = response;
      for(let i=0; i<cartProducts.length; i++) {
        for(let j=0; j<updatedItems.length; j++) {
          if(updatedItems[j].name === cartProducts[i].name && cartProducts[i].checked === false) {
            updatedItems[j].selected = cartProducts[i].selected;
            updatedItems[j].totalPrice = cartProducts[i].totalPrice;
          } 
        }
      }
      setProducts(updatedItems);
      alert("order placed Successfully!!");
      navigate("/home");
    });
  }

    return (
        <>
        <div className="checkout-bar">
          <button onClick={backToCart} className="button" type="button">Back to Cart</button>
          <div><b>Checkout</b></div>
          <div><b>Total Price: {totalPrice}</b></div>
          <button onClick={backToHome} className="button" type="button" disabled={!totalPrice}>Proceed to payment</button>

        </div>
        <div className="checkout-items">
        {(cartProducts.filter((i)=> i.checked === true)).map((item) => 
          <CheckoutItem key={item.name} {...item} />
        )}
        </div>        
        </>
    );
}

export default CheckoutPage