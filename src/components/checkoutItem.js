import useImage from "../hooks/useImage";

function CheckoutItem(props) {
  const { image } = useImage(props.imageName);

  return (
    <div className="checkout-item">
      <div className="checkout-item-details">
        <img className="cart-item-img" src={image} alt="cart-item-img" />
        <div className="cart-item-name">{props.name}</div>
        <div className="checkout-item-description">{props.description}</div>
        <div className="cart-item-price">Rs. {props.price}</div>
      </div>

      <div className="cart-select-total">
        <div className="cart-selected">Selected: {props.selected}</div>
        <div className="cart-item-total">Total Price: {props.totalPrice}</div>
      </div>
    </div>
  );
}

export default CheckoutItem
