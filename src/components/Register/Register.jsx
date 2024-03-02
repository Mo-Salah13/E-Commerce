import React, { useState } from 'react';
// import Style from './Register.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Register() {
    let [registerMsg, setRegisterMsg] = useState('');
    let [loading, setLoading] = useState(true);
    let navigate = useNavigate();
    async function RegisterForm(value) {
        setLoading(false)
        let request = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, value).catch((error) => {
            setRegisterMsg(error.response.data.message)
            setLoading(true)
            // console.log();
        })
        if (request?.data.message === "success") {
            navigate('/login');
        }

    }
    let validationSchema = Yup.object({
        name: Yup.string().required('Name Is Required!').min(3, 'minimum Char 3').max(20, 'Maximum Char 20'),
        email: Yup.string().required('Email is Required').email('Ex. yourEmail@.com'),
        password: Yup.string().required("We don't prefer repeated Characters").matches(/^[A-Z][A-Za-z!*%$#^&@(_0-9]{6,16}$/, 'Must Start with Capital Letter'),
        rePassword: Yup.string().required("Re Password").oneOf([Yup.ref('password')], "Doesn't Matched the Password"),
        phone: Yup.string().required('Your Phone Number is Required').matches(/^01[1250][0-9]{8}$/, 'Enter Valid Number')
    })
    let formIk = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',
        },
        onSubmit: RegisterForm,
        validationSchema
    })
    return <>
        <Helmet>
            {/* <meta charSet="utf-8" /> */}
            <title>Register </title>
            {/* <link rel="canonical" href="http://mysite.com/example" /> */}
        </Helmet>
        <h1 className='mb-5 mt-3'>Register Now ...</h1>
        {registerMsg !== '' ? <div className='alert alert-warning'>{registerMsg}</div> : ''}
        <form onSubmit={formIk.handleSubmit} className='w-50'>
            <div>
                <label htmlFor="name">Name:</label>
                <input onBlur={formIk.handleBlur} onChange={formIk.handleChange} type="text" id='name' name='name' className='form-control my-2' />
                {(formIk.errors.name && formIk.touched.name) ? <div className='alert py-1 alert-danger'>{formIk.errors.name}</div> : ''}
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input onBlur={formIk.handleBlur} onChange={formIk.handleChange} type="email" id='email' name='email' className='form-control my-2' />
                {(formIk.errors.email && formIk.touched.email) ? <div className='alert py-1 alert-danger'>{formIk.errors.email}</div> : ''}
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input onBlur={formIk.handleBlur} onChange={formIk.handleChange} type="password" id='password' name='password' className='form-control my-2' />
                {(formIk.errors.password && formIk.touched.password) ? <div className='alert py-1 alert-danger'>{formIk.errors.password}</div> : ''}
            </div>
            <div><label htmlFor="rePassWord">Re-Password:</label>
                <input onBlur={formIk.handleBlur} onChange={formIk.handleChange} type="password" id='rePassWord' name='rePassword' className='form-control my-2' />
                {(formIk.errors.rePassword && formIk.touched.rePassword) ? <div className='alert py-1 alert-danger'>{formIk.errors.rePassword}</div> : ''}
            </div>
            <div>
                <label htmlFor="phone">Phone:</label>
                <input onBlur={formIk.handleBlur} onChange={formIk.handleChange} type="tel" id='phone' name='phone' className='form-control my-2' />
                {(formIk.errors.phone && formIk.touched.phone) ? <div className='alert py-1 alert-danger'>{formIk.errors.phone}</div> : ''}
            </div>
            {loading ? <button disabled={!(formIk.isValid && formIk.dirty)} type='submit' className='btn bg-main text-white my-3'>Register</button> :
                <button type='button' className='btn bg-main text-white my-3'><i className='fas fa-spinner fa-spin'></i></button>}
        </form>
    </>

}
