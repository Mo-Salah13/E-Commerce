import React from 'react';
import { NavLink } from 'react-router-dom';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Helmet } from 'react-helmet';
// import Style from './Categories.module.css';

export default function Categories() {

    return <>
        <Helmet>
            {/* <meta charSet="utf-8" /> */}
            <title>Categories </title>
            {/* <link rel="canonical" href="http://mysite.com/example" /> */}
        </Helmet>
        <div className='my-5'>
            <CategorySlider />
        </div>
        <ul className="nav nav-tabs border-0 justify-content-center">
            <li className="nav-item">
                <NavLink className="nav-link " to="music">Music</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="Men'sFashion"> Men'sFashion</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="Women'sFashion"> Women'sFashion</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="SuperMarket"> Super Market</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="Baby&Toys"> Baby & Toys</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="House"> House</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="Books"> Books</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="Beauty&Health"> Beauty & Health</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="Mobiles"> Mobiles</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="Electronics"> Electronics</NavLink>
            </li>
        </ul>
    </>

}
