import axios from 'axios';
import React from 'react';
import Style from './Brands.module.css';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function Brands() {
    function getAllBrands() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    }
    let { data, isLoading } = useQuery('brand', getAllBrands);
    // console.log(data);
    return <>
        <Helmet>
            {/* <meta charSet="utf-8" /> */}
            <title>Brands </title>
            {/* <link rel="canonical" href="http://mysite.com/example" /> */}
        </Helmet>
        {isLoading ? <div className='d-flex align-items-center justify-content-center my-5 py-5'>
            <i className='fas fa-spinner text-main fa-spin fa-2x'></i>
        </div> : <><h1 className='text-center text-main fw-bolder py-5'> Our All Brands</h1>
            <div className="row g-3 text-center">
                {data?.data.data.map((brand, index) => {
                    return <div key={brand._id} className="col-md-3">
                        <div className={Style.brands}>
                            <div className="border image rounded-2  px-2 py-3 cursor-pointer">
                                <img className='w-100' src={brand.image} alt="" />
                                <Link data-bs-toggle="modal" data-bs-target={"#exampleModal-" + index} className="title"></Link>
                            </div>
                        </div>
                        <div className="modal fade bg-dark bg-opacity-75" id={"exampleModal-" + index} tabIndex="-1"
                            aria-labelledby={"exampleModalLabel-" + index} aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content ">
                                    <div className="modal-body p-0 ">
                                        <img src={brand.image} className="w-100" alt="brand logo" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </>
        }

    </>
}
