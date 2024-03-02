import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Flip, toast } from 'react-toastify';
import { CartContext } from '../../Context/cartContext';
// import Style from './Product.module.css';
export default function Product({ product }) {
    let { setCart } = useContext(CartContext)

    async function addProductToCart(productId) {
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        setCart(data)
        toast.success(data.message, {
            autoClose: 1000,
            pauseOnHover: false,
            transition: Flip,
        });
        // console.log(data);
    }
    return <>
        <div className="product overflow-hidden px-2 py-3 cursor-pointer">
            <Link className='text-decoration-none text-black' to={"/productDetails/" + product.id}>
                <img className='w-100' src={product.imageCover} alt="" />
                <h5 className=' mt-2 font-sm text-main'>{product.category.name}</h5>
                <h4>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
                <hr />
                <p className='d-flex justify-content-between'>
                    <span>{product.price} EGP</span>

                    <span>
                        <i className='fas fa-star rating-color me-1'></i>
                        <span>{product.ratingsAverage}</span>
                    </span>
                </p>
            </Link>
            <button onClick={() => addProductToCart(product.id)} className='btn bg-main text-white w-100'> + Add To Cart</button>
        </div>
    </>

}
