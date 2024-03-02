import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import Style from './CategorySlider.module.css';
import Slider from "react-slick";
// import { useQuery } from 'react-query';

export default function CategorySlider() {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,

    };

    const [category, setCategory] = useState([])
    async function getCategories() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        setCategory(data.data);
        // console.log( data.data);
    }
    useEffect(() => {
        getCategories()
    }, [])
    return <>
        <Slider {...settings}>
            {category.map((category,index) => {
                return <div key={index} className='text-center'>
                    <div className='mx-1'>
                    <img height={180} src={category.image} className='w-100  rounded-4 cursor-pointer ' alt="category_Photo" />
                    </div>
                    <h5 className='mt-2'>{category.name}</h5>
                </div>
            })}


        </Slider>
    </>

}
