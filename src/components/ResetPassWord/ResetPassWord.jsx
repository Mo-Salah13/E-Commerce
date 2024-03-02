import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
// import Style from './ResetPassWord.module.css';


export default function ResetPassWord() {
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    let navigate = useNavigate()

    let validationSchema = Yup.object({
        email: Yup.string().required('Email is Required').email('Ex. yourEmail@.com'),
        newPassword: Yup.string().required("New PassWord Required").matches(/^[A-Z][A-Za-z!*%$#^&@(_0-9]{6,16}$/, 'Must Start with Capital Letter'),
    })
    let formIk = useFormik(
        {
            initialValues:
            {
                email: '',
                newPassword: ''
            },
            onSubmit: setNewPassWord,
            validationSchema
        })
    async function setNewPassWord(value) {
        setLoading(false)
        let newPW = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, value).catch((error) => {
            setErrorMsg(error.response.data.message)
            setLoading(true)
        })
        if (newPW.data.token) {
            navigate('/login')
        }
        // console.log(newPW);
    }
    return <>
        <Helmet>
            {/* <meta charSet="utf-8" /> */}
            <title>Reset PassWord </title>
            {/* <link rel="canonical" href="http://mysite.com/example" /> */}
        </Helmet>
        <h1>Reset a New PassWord</h1>
        {errorMsg ?
            <div className='alert alert-danger'>
                {errorMsg}
            </div>
            : ''}
        <form className='w-50' onSubmit={formIk.handleSubmit} >
            <div>
                <label htmlFor="email">Email:</label>
                <input onBlur={formIk.handleBlur} onChange={formIk.handleChange} type="email" id='email' name='email' className='form-control my-2' />
                {(formIk.errors.email && formIk.touched.email) ? <div className='alert py-1 alert-danger'>{formIk.errors.email}</div> : ''}
            </div>
            <div>
                <label htmlFor="newPassword">New Password:</label>
                <input onBlur={formIk.handleBlur} onChange={formIk.handleChange} type="password" id='newPassword' name='newPassword' className='form-control my-2' />
                {(formIk.errors.newPassword && formIk.touched.newPassword) ? <div className='alert py-1 alert-danger'>{formIk.errors.newPassword}</div> : ''}
            </div>
            {loading ? <button className='btn bg-main text-white my-3' type='submit'>Continue</button> :
                <button type='button' className='btn bg-main text-white my-3'><i className='fas fa-spinner fa-spin'></i></button>}


        </form>
    </>

}
