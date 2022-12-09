import axios from 'axios';

export const getProducts=async ()=> {
         return await axios.get("http://localhost:8080/api/products")
        .then((response) => {
           return JSON.stringify(response.data); 
        }).catch((err)=>{
          console.log(err)
        });
}

export const updateProducts = async (cartItems)=> {
  return await axios.post("http://localhost:8080/api/products", cartItems)
  .then((response) => {
    return response.data;
  }).catch((err)=> {
    console.log(err);
  })
}