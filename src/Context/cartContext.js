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
    return <CartContext.Provider value={{ cart, setCart }}>
        {children}
    </CartContext.Provider>
}