import React, { useState } from 'react';
// import Style from './CartProduct.module.css';
export default function CartProduct({ cartProduct, removeProductFromCart, changeProductCount }) {
    const [count, setCount] = useState(cartProduct.count)
    return <>
        <div className='shadow rounded-2  my-3 '>
            <div className="row  align-items-center">
                <div className="col-md-2">
                    <img src={cartProduct.product.imageCover} className='w-100 m-2' alt="" />
                </div>
                <div className="col-md-8 ">
                    <h3>{cartProduct.product.title}</h3>
                    <h5>{cartProduct.product.category.name}</h5>
                    <p className='d-flex'>
                        <span className='me-5'>{cartProduct.price} EGP</span>
                        <span><i className='fas fa-star rating-color ms-1'></i>{cartProduct.product.ratingsAverage}</span>
                    </p>
                    <p> <span className='fw-bolder'>Total Price :</span> {cartProduct.price * cartProduct.count} EGP</p>
                </div>
                <div className="col-md-2 ms-auto text-center">
                    <button onClick={() => removeProductFromCart(cartProduct.product._id)} className='btn text-danger border rounded-2 border-danger my-2'>Remove</button>
                    <div className='d-flex align-items-center'></div>
                    <button disabled={count===1} onClick={() => { changeProductCount(cartProduct.product._id, count - 1); setCount(count - 1) }} className='btn bg-main text-white mx-2'> - </button>
                    <span>{count}</span>
                    <button onClick={() => { changeProductCount(cartProduct.product._id, count + 1); setCount(count + 1) }} className='btn bg-main text-white mx-2'> + </button>
                </div>
            </div>
        </div>
    </>

}
