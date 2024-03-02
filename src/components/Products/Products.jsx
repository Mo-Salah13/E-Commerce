import React from 'react';
// import Style from './Products.module.css';
import axios from 'axios';
import Product from '../Product/Product';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';


export default function Products() {

    function getAllProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }

    let { data, isLoading } = useQuery('Products', getAllProducts)

    return <>
        <Helmet>
            {/* <meta charSet="utf-8" /> */}
            <title>Products </title>
            {/* <link rel="canonical" href="http://mysite.com/example" /> */}
        </Helmet>
        {isLoading ?

            <div className='d-flex align-items-center justify-content-center my-5 py-5'>
                <i className='fas fa-spinner text-main fa-spin fa-2x'></i>
            </div> :
            <>
                <h1 className='text-center text-main mt-2'>Shuffle Products</h1>
                <div className="row g-2 mt-5">
                    {data?.data.data.map((product) =>
                        <div key={product.id} className="col-md-3">
                            <div className='border m-1'>
                                <Product product={product} />
                            </div>
                        </div>
                    )}
                </div></>}

    </>

}
