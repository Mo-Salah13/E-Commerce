import React, { useContext, useEffect, useState } from 'react';
// import Style from './WishList.module.css';
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/cartContext';

export default function WishList() {
    let { getLoggedUserWishList ,removeWishListItem } = useContext(CartContext);
    const [wishList, setWishList] = useState(null)
    async function getWishList() {
        let { data } = await getLoggedUserWishList();
        setWishList(data)
        // console.log(data);
    }

    async function removeFromWishList(productId){
        let {data} = await removeWishListItem(productId)
        setWishList(data)
        // console.log(data);
    }

    useEffect(() => {
        getWishList();
    }, [])
    return <>
        <Helmet>
            {/* <meta charSet="utf-8" /> */}
            <title>WishList </title>
            {/* <link rel="canonical" href="http://mysite.com/example" /> */}
        </Helmet>
        <h1 className='text-center my-3 text-main'>Your WishList</h1>
        {wishList ? <div>
            {wishList?.data.map((element,index) =>
                <div key={index} className='shadow rounded-2  my-3 w-75 mx-auto'>
                    <div className="row  align-items-center ">
                        <div className="col-md-2">
                            <img src={element.imageCover} className='w-100 border m-2' alt="" />
                        </div>
                        <div className="col-md-4  ">
                            <h3 className='text-main fw-bold'>{element.title}</h3>
                            <h5><span className='text-danger'>{element.quantity}</span> items left</h5>
                            <p className='d-flex'>
                                <span className='me-5 fst-italic'>{element.price} EGP</span>
                                <span><i className='fas fa-star rating-color ms-1'></i>{element.ratingsAverage}</span>
                            </p>
                    <button onClick={() => removeFromWishList(element.id)} className='btn text-danger border rounded-2 border-danger my-2'>Remove</button>
                        </div>
                    </div>
                </div>)}
        </div> : <div className='d-flex align-items-center justify-content-center my-5 py-5'>
            <i className='fas fa-spinner text-main fa-spin fa-2x'></i>
        </div>}

    </>


}
