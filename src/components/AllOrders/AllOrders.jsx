import React, { useEffect, useState } from 'react';
import Style from './AllOrders.module.css';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { Helmet } from 'react-helmet';


export default function AllOrders() {
    const [myOrder, setMyOrder] = useState()
    const [loading, setLoading] = useState(false)

    async function getMyAllOrders(id) {
        setLoading(true)
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/` + id);
        setMyOrder(data);
        setLoading(false)
        // console.log(data);
    }
    useEffect(() => {
        let { id } = jwtDecode(localStorage.getItem('token'));
        getMyAllOrders(id);
        // console.log(id);
    }, [])
    return <>
        <Helmet>
            {/* <meta charSet="utf-8" /> */}
            <title>All Orders </title>
            {/* <link rel="canonical" href="http://mysite.com/example" /> */}
        </Helmet>
        {loading ? <><div className='d-flex align-items-center justify-content-center my-5 py-5'>
            <i className='fas fa-spinner text-main fa-spin fa-2x'></i>
        </div></> :
            <><h1>Your Orders: </h1>
                {myOrder?.map((order) => {
                    return <div key={order.id} className=' row'>
                        <div className="col-md-12 shadow rounded-2 p-4 my-4">
                            <div className='d-flex align-items-center'>
                                <h2 className='fw-bolder h1'>#{order.id}</h2>
                                <h4 className='fw-bold  ms-5'>Payment : [<span className='fw-bold text-primary mx-1'>{order?.paymentMethodType}</span>]</h4>
                            </div>
                            <p>You Have Ordered <span className='text-main fw-bold'>({order.cartItems.length})</span> items.</p>
                            <div className='d-flex'>
                                {order.cartItems.map((item) => {
                                    return <img key={item._id} className='me-1 border rounded-1' src={item.product.imageCover} width={150} alt=" img Of Product  What You Bought" />
                                })}
                            </div>
                            <hr />
                            <div className='d-flex justify-content-between'>
                                <p className='text-muted'> <strong className='text-black fst-italic'> Total Order Price :  </strong>{order.totalOrderPrice} EGP </p>
                                <p className='text-muted'> <strong className='text-black fst-italic'> Date Of Pay : </strong>{order.paidAt} </p>
                            </div>
                        </div>
                    </div>
                })}</>}


    </>

}
