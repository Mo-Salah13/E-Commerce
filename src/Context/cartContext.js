import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let CartContext = createContext();
export function CartContextProvider({ children }) {
    const [cart, setCart] = useState({});
    async function cartCounter() { //!5as b3ard order count
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });
            setCart(data);
        } catch (error) {
            // console.log(error.message);
        }
    }
    useEffect(() => {
        cartCounter()
    }, [])

    function addToWishList(productId) { // !5as b 2daft el-product to wishList 
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            {
                productId
            },
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            }
        ).then((response) => response)
            .catch((error) => error)
    }

    function getLoggedUserWishList() { //!5as b 3ard el-wishlist
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .then((response) => response)
            .catch((error) => error)
    }
    function removeWishListItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/`+ productId , {
            headers: {
                token: localStorage.getItem('token')
            }
        }).then((response) => response)
            .catch((error) => error)
    }
    return <CartContext.Provider value={{ cart, setCart, addToWishList, getLoggedUserWishList, removeWishListItem }}>
        {children}
    </CartContext.Provider>
}
