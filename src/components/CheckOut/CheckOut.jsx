import React, { useState } from 'react';
// import Style from './CheckOut.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';


export default function CheckOut() {
    let [errorMsg, setErrorMsg] = useState('');
    let [loading, setLoading] = useState(true);
    let { cartId } = useParams()



    let validationSchema = Yup.object({
        details: Yup.string().required('Name Is Required!'),
        city: Yup.string().required('Name Is Required!'),
        phone: Yup.string().required('Your Phone Number is Required').matches(/^01[1250][0-9]{8}$/, 'Enter Valid Egyptian Number')
    })
    let formIk = useFormik({
        initialValues: {
            details: '',
            city: '',
            phone: '',
        },
        onSubmit: onSubmit,
        validationSchema
    })
    async function onSubmit() {
        setLoading(false)
        setErrorMsg('')
        try {
            // console.log(formIk.values);
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, {
                shippingAddress: formIk.values
            }, {
                headers: {
                    token: localStorage.getItem('token')
                }, params: {
                    url: 'https://mo-salah13.github.io/E-Commerce/#/allOrd'
                }
            })
            // console.log(data);
            window.open(data.session.url, '_self')
            setLoading(true)

        }
        catch (error) {
            setErrorMsg(error.response.data.message)
        }
    }

    return <>
        <Helmet>
            {/* <meta charSet="utf-8" /> */}
            <title>Check Out </title>
            {/* <link rel="canonical" href="http://mysite.com/example" /> */}
        </Helmet>
        <h1>Please Enter Your Address</h1>
        {errorMsg !== '' ? <div className='alert alert-warning'>{errorMsg}</div> : ''}
        <form onSubmit={formIk.handleSubmit} className='w-50'>
            <div>
                <label htmlFor="details">Details:</label>
                <textarea style={{ maxHeight: 100 }} placeholder='Street, Building  & Apartment Number' onBlur={formIk.handleBlur} onChange={formIk.handleChange} type="text" id='details' name='details' className='form-control my-2' />
                {(formIk.errors.details && formIk.touched.details) ? <div className='alert py-1 alert-danger'>{formIk.errors.details}</div> : ''}
            </div>
            <div>
                <label htmlFor="city">city:</label>
                <input onBlur={formIk.handleBlur} onChange={formIk.handleChange} type="text" id='city' name='city' className='form-control my-2' />
                {(formIk.errors.city && formIk.touched.city) ? <div className='alert py-1 alert-danger'>{formIk.errors.city}</div> : ''}
            </div>
            <div>
                <label htmlFor="phone">Phone:</label>
                <input onBlur={formIk.handleBlur} onChange={formIk.handleChange} type="tel" id='phone' name='phone' className='form-control my-2' />
                {(formIk.errors.phone && formIk.touched.phone) ? <div className='alert py-1 alert-danger'>{formIk.errors.phone}</div> : ''}
            </div>
            {loading ? <button disabled={!(formIk.isValid && formIk.dirty)} type='submit' className='btn bg-main text-white my-3'>Continue</button> :
                <button type='button' className='btn bg-main text-white my-3'><i className='fas fa-spinner fa-spin'></i></button>}
        </form>
    </>

}
