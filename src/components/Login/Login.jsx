import React, { useContext, useState } from 'react';
// import Style from './Login.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/userContext';
import { Helmet } from 'react-helmet';
export default function Login() {

    let { setUserToken } = useContext(UserContext)


    let [LoginMsg, setLoginMsg] = useState('');
    let [loading, setLoading] = useState(true);
    let navigate = useNavigate();


    let validationSchema = Yup.object({
        email: Yup.string().required('Email is Required').email('Ex. yourEmail@.com'),
        password: Yup.string().required("We don't prefer repeated Characters").matches(/^[A-Z][A-Za-z!*%$#^&@(_0-9]{6,16}$/, 'Must Start with Capital Letter'),
    })

    let formIk = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: userLogin,
        validationSchema
    })

    async function userLogin(value) {
        setLoading(false)
        let loginReq = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, value).catch((error) => {
            setLoginMsg(error.response.data.message)
        })
        if (loginReq.data.message === 'success') {
            setLoading(true);
            localStorage.setItem('token', loginReq.data.token)
            // console.log(loginReq.data.token);
            setUserToken(loginReq.data.token);
            navigate('/')
        }

    }

    return <>
        <Helmet>
            {/* <meta charSet="utf-8" /> */}
            <title>Login </title>
            {/* <link rel="canonical" href="http://mysite.com/example" /> */}
        </Helmet>
        <h1 className='mb-5 mt-3'>Login Now ...</h1>
        {LoginMsg !== '' ? <div className='alert alert-danger'>{LoginMsg}</div> : ''}
        <form onSubmit={formIk.handleSubmit} className='w-50'>
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
            {loading ? <button disabled={!(formIk.isValid && formIk.dirty)} type='submit' className='btn bg-main text-white my-3'>Login</button> :
                <button type='button' className='btn bg-main text-white my-3'><i className='fas fa-spinner fa-spin'></i></button>}
            <span className=''>
                <Link className='btn' to='/register'>😄Don't Have Account ?</Link>
                <Link className='btn ms-2' to='/forgetPassword'>😣Forget Password !</Link>
            </span>
        </form>
    </>

}



