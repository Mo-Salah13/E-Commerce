import React, { useState } from 'react';
// import Style from './ForgetPassword.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function ForgetPassword() {
    let [errorMsg, setErrorMsg] = useState('');
    let [formStatus, setFormStatus] = useState(true);
    let [loading, setLoading] = useState(true);
    let navigate = useNavigate()

    // ! 5aas bt3'yer elPassword !
    let validationSchema = Yup.object({
        email: Yup.string().required('Email Required').email('Enter Your Email')
    })
    let formIk = useFormik({
        initialValues:
        {
            email: ''
        },
        onSubmit: forgetPasswordAPI,
        validationSchema
    })
    async function forgetPasswordAPI(value) {
        setLoading(false)
        let getNewPassword = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, value).catch((error) => {
            setErrorMsg(error.response.data.message)
            setLoading(true)
        })
        if (getNewPassword.data.statusMsg === 'success') {
            setFormStatus(false)
        }
    }
    // *--------------------------------------------------------------------------*
    // ! 5aas bel reset Code !
    let validationSchema2 = Yup.object({
        resetCode: Yup.string().required('resetCode Required').matches(/^[0-9]{5,6}$/, 'Enter Correct Code')
    })
    let formIk_2 = useFormik(
        {
            initialValues:
            {
                resetCode: ''
            },
            onSubmit: verifyResetCode,
            validationSchema: validationSchema2
        })
    async function verifyResetCode(value) {
        let resetCode = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, value).catch((error) => {
            setErrorMsg(error.response.data.message)
        })
        // console.log(resetCode);
        if (resetCode.data.status === "Success") {
            navigate('/resetPassword')
        }
    }
    return <>
        <Helmet>
            {/* <meta charSet="utf-8" /> */}
            <title>Forget PassWord </title>
            {/* <link rel="canonical" href="http://mysite.com/example" /> */}
        </Helmet>
        <p className='text-muted fw-bold fa-2x'>ForgetPassword</p>
        {errorMsg ?
            <div className='alert alert-danger'>
                {errorMsg}
            </div>
            : ''}
        <div className='w-50'>
            {formStatus ? <form onSubmit={formIk.handleSubmit}>
                <label htmlFor="email">Enter Your Email </label>
                <input onBlur={formIk.handleBlur} onChange={formIk.handleChange} className='form-control my-2' type="text" name="email" id="email" />
                {loading ? <button className='btn bg-main text-white my-3' type='submit'>Continue</button> :
                    <button type='button' className='btn bg-main text-white my-3'><i className='fas fa-spinner fa-spin'></i></button>}
            </form> :
                <form onSubmit={formIk_2.handleSubmit} >
                    <label htmlFor="resetCode">Enter Reset Code </label>
                    <input onBlur={formIk_2.handleBlur} onChange={formIk_2.handleChange} className='form-control my-2' type="text" name="resetCode" id="resetCode" />
                    {formIk_2.errors.resetCode && formIk_2.touched.resetCode ? <div className='alert alert-warning'>{formIk_2.errors.resetCode}</div> : ''}
                    <button className='btn bg-main text-white my-3' type='submit'>Verify Code</button>
                </form>}
        </div>
    </>

}
