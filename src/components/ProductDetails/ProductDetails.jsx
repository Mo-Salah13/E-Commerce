import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
// import Style from './ProductDetails.module.css';
import Slider from "react-slick";

export default function ProductDetails() {
    let settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };
    // console.log(params); //*useParams ==> hook byRaga3 object{} fee kOll elParams eLly fl url path .
    let { id } = useParams()
    const [loading, setLoading] = useState(false)
    let [productDetails, setProductDetails] = useState({})
    async function getProductDetails() {
        setLoading(true)
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/` + id)
        // console.log(data.data);
        setProductDetails(data.data)
        setLoading(false)
    }
    useEffect(() => {
        getProductDetails();
    }, [])
    return <>
        {loading ? <><div className='d-flex align-items-center justify-content-center my-5 py-5'>
            <i className='fas fa-spinner text-main fa-spin fa-2x'></i>
        </div>
        </> :
            <>
                <Link to={'/products'} className='fas fa-arrow-left text-main fa-2x cursor-pointer text-decoration-none'></Link>
                <div className="row align-items-center mt-4 py-5 border rounded-4 shadow">
                    <div className="col-md-3">
                        <Slider {...settings}>
                            {productDetails.images?.map((img, index) => {
                                return <img src={img} key={index} className='w-100 border cursor-pointer rounded-2 ' alt="product_Photo" />
                            })}
                        </Slider>
                    </div>
                    <Helmet>
                        {/* <meta charSet="utf-8" /> */}
                        <title>{productDetails.title}</title>
                        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
                    </Helmet>
                    <div className="col-md-9">
                        <h2 className='mt-2'>{productDetails?.title}</h2>
                        <h5 className='font-sm text-main mt-2'>{productDetails?.category?.name}</h5>
                        <p className='mt-2'>{productDetails?.description}</p>
                        <p className='d-flex justify-content-between mt-2'>
                            <span>{productDetails?.price} EGP</span>
                            <span>
                                <i className='fas fa-star rating-color me-1'></i>
                                <span>{productDetails?.ratingsAverage}</span>
                            </span>
                        </p>
                        <button className='btn bg-main text-white w-25 m-auto'> Add To Cart </button>
                    </div>
                </div>
            </>}
    </>

}
