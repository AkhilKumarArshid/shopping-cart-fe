import { useContext, useEffect, useState } from "react";
import { cartItemsContext } from "../../App";
import SearchSortBar from "../searchSortBar";
import CartItem from "../cartItem"
import { NavLink } from "react-router-dom";

function CartPage() {
    const {products, setCartProducts} = useContext(cartItemsContext);
    let itemsArray = products;
    const [searchText, setSearchText] = useState('');
    const [itemsInCart, setItemsInCart] = useState([]);
    let items = itemsArray.map((item)=> {return {...item, checked:true}});
     items = JSON.parse(JSON.stringify(items.filter((item) => item.selected && item.selected > 0))); //working

    useEffect(()=>{
        setItemsInCart([...items]);
        setCartProducts([...items]);
    }, []);

    const incDecItem = (operation, itemName)=> {
        let index = itemsInCart.findIndex((item) => item.name === itemName);
        let itemIndex = itemsArray.findIndex((item) => item.name === itemName);
        itemsArray = update(itemIndex, operation, itemsArray);
        setItemsInCart(update(index, operation, itemsInCart));
        setCartProducts(itemsInCart);
    }

    const handleRemoveItem = (itemName)=> {
        let index = itemsInCart.findIndex((item) => item.name === itemName);
        setItemsInCart([...update(index, 'delete', itemsInCart)]);
        setCartProducts(itemsInCart);
        updateProductsList(itemName);
    }

    const handleCheckbox = (item)=> {
        let arr = itemsInCart;
        let index = arr.findIndex((product) => product.name === item.name);
        arr[index] = item;
        setItemsInCart(arr);
        setCartProducts(itemsInCart);
        
    }

    const update = (index, operation, arr)=> {
        if(index!==-1) {
            switch(operation) {
                case "add":
                    arr[index].selected += 1;
                    arr[index].totalPrice += arr[index].price;
                    break;
                case "dec":
                    arr[index].selected -=1;
                    arr[index].totalPrice -= arr[index].price;
                    break;
                case "delete":
                    arr.splice(index, 1);
                    break;
                default :
                //do nothing
                    break;
            }
        }
        return arr;
    }

    const updateProductsList = (itemName) => {
        let index = itemsArray.findIndex((item) => item.name === itemName);
        itemsArray[index].selected = 0;
        itemsArray[index].totalPrice = 0;
    }

    const handleSearchSort = (obj) => {

        let arr = JSON.parse(JSON.stringify(itemsInCart));
        setSearchText(obj.text);
        if(obj.order === "Ascending") {

            if(obj.sortType === "Name") {
                arr.sort((a,b)=> { 
                    let nameA = a.name.toUpperCase();
                    let nameB = b.name.toUpperCase();
                    if(nameA > nameB) return -1; 
                    else if(nameA < nameB) return 1; else return 0;
                });
            } else if(obj.sortType === "Cost") {
                arr.sort((a,b)=> b.price - a.price);
            } else if(obj.sortType === "Quantity") {
                arr.sort((a,b)=> b.quantity - a.quantity);
            }
            setItemsInCart([...arr]);
            setCartProducts(itemsInCart);
        }

        if(obj.order === "Descending") {
           
            if(obj.sortType === "Name") {
                arr.sort((a,b)=> { 
                    let nameA = a.name.toUpperCase();
                    let nameB = b.name.toUpperCase();
                    if(nameA > nameB) return 1; 
                    else if(nameA < nameB) return -1; else return 0;
                });
            } else if(obj.sortType === "Cost") {
                arr.sort((a,b)=> a.price - b.price);
            } else if(obj.sortType === "Quantity") {
                arr.sort((a,b)=> a.quantity - b.quantity);
            }
            setItemsInCart([...arr]);
            setCartProducts(itemsInCart);

        }
    }

    return (
        <>
        <SearchSortBar handleClicks = {(obj)=> handleSearchSort(obj)}/>
        <div className="cart-layout">
            <NavLink to="/home" ><button className="button" type="button">Back to Home</button></NavLink>
            <div>
        {(itemsInCart.filter((i)=> i.name.toLowerCase().includes(searchText.toLowerCase()))).map((item) => 
          <CartItem handleItemIncDec = {(op,item)=>incDecItem(op, item)} handleRemoveItem={(item)=>handleRemoveItem(item)} itemCheck={(item)=> handleCheckbox(item)} key={item.name} {...item} />
        )}
        </div>
        <NavLink to="/cart/checkout"> <button className="button" type="button">Checkout</button></NavLink>

      </div>
        </>

    );
}

export default CartPage