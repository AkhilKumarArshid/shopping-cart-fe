import { useContext, useEffect, useState } from "react";
import ItemCard from "../itemCard";
import SearchSortBar from "../searchSortBar";
import { cartItemsContext } from "../../App";

function HomePage(setCartItems) {
  const { products, setProducts } = useContext(cartItemsContext);
  const [itemsList, setItemsList] = useState([]);
  const [searchText, setSearchText] = useState('');
  let items = JSON.parse(JSON.stringify(products));
  useEffect(()=> {
    setItemsList(items);
  },[products]);

  const addToCart = (item) => {
    let itemsArray = itemsList;
    let productsArray = products;

    let index = itemsList.findIndex((product) => product.name === item.name);
    itemsArray[index] = item;
    setItemsList(itemsArray);

    let prodIndex = products.findIndex((product) => product.name === item.name);
    productsArray[prodIndex] = item;
    setProducts(productsArray);

  };

  const handleSearchSort = (obj) => {
    let arr = itemsList;
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
        setItemsList([...arr]);
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
        setItemsList([...arr]);

    }
}

  return (
    <>
      <SearchSortBar handleClicks = {(obj)=> handleSearchSort(obj)}/>
      <div className="cards-container">
        {(itemsList.filter((i)=> i.name.toLowerCase().includes(searchText.toLowerCase()))).map((item) => (
          <ItemCard itemSelected={addToCart} key={item.name} {...item} />
        ))}
      </div>
    </>
  );
}

export default HomePage;
