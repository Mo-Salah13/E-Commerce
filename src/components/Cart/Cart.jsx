import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartProduct from '../CartProduct/CartProduct';
import Swal from 'sweetalert2';
import { CartContext } from '../../Context/cartContext';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';

// import Style from './Cart.module.css';

export default function Cart() {
    const [loading, setLoading] = useState(false)
    const [cart, setCart] = useState({});
    const [timeOutId, setTimeOutId] = useState()
    const [cartId, setCartId] = useState()
    let { setCart: setContextCart } = useContext(CartContext)

    async function getMySoldProducts() { //!func show my selected products to buy//
        setLoading(true)
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });
            // console.log(data);
            setCart(data);
            setCartId(data.data._id)
            setLoading(false)

        } catch (error) {
            // console.log(error.message);
        }
    }
    useEffect(() => {
        getMySoldProducts()
    }, [])
    //*------------------------------------------------------------------------------*//
    function removeProductFromCart(productId) {//!func remove product from cart//
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: " btn mx-2 bg-main text-white",
                cancelButton: " btn mx-2 btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/` + productId, {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                });
                setCart(data);
                setContextCart(data)
                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your Item has been deleted.",
                    icon: "success"
                });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary Item is safe :)",
                    icon: "error"
                });
            }
        });

    }
    //*------------------------------------------------------------------------------*//
    async function clearProductFromCart() {//!func Clear product from cart//
        setLoading(true)
        let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`, {
            headers: {
                token: localStorage.getItem('token')
            }
        });
        setCart(data);
        setContextCart({})
        setLoading(false)
    }
    //*------------------------------------------------------------------------------*//
    function changeProductCount(productId, count) {//!func update product count in cart//
        clearTimeout(timeOutId)
        setTimeOutId(setTimeout(async () => {
            if (count === 0) {
                removeProductFromCart(productId)
            } else {
                let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/` + productId, {
                    count
                }, {
                    headers: {
                        token: localStorage.getItem(`token`)
                    }
                });
                // console.log(data);
                setCart(data);
            }
        }, 500))
    }


    return <>
        <Helmet>
            {/* <meta charSet="utf-8" /> */}
            <title>Cart </title>
            {/* <link rel="canonical" href="http://mysite.com/example" /> */}
        </Helmet>
        {loading ? <div className='d-flex align-items-center justify-content-center my-5 py-5'>
            <i className='fas fa-spinner text-main fa-spin fa-2x'></i>
        </div> : <>
            <Link to={'/'} className=' my-3 fas fa-arrow-left text-main fa-2x cursor-pointer text-decoration-none'></Link>
            {cart.data?.products.length > 0 ? <div className="my-5">
                <button onClick={() => clearProductFromCart()} className='btn btn-outline-danger d-block  ms-auto'> Clear Cart</button>
                {cart.data?.products.map((cartProduct, index) => {
                    return <CartProduct changeProductCount={changeProductCount} removeProductFromCart={removeProductFromCart} key={index} cartProduct={cartProduct} />
                })}
                <div className='d-flex justify-content-between'>
                    <Link to={'/checkout/' + cartId} className='btn bg-main text-white'>Check Out</Link>
                    <p> Total Cart Price: {cart.data?.totalCartPrice} EGP</p>
                </div>
            </div> :
                <h2 className='alert alert-warning text-center my-5'>Your Cart is MT</h2>
            }
        </>}


    </>

}
