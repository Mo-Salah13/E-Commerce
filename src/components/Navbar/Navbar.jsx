import React, { useContext } from 'react';
// import Style from './Navbar.module.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/freshcart-logo.svg'
import { UserContext } from '../../Context/userContext';
import { CartContext } from '../../Context/cartContext';

export default function Navbar() {
    let { cart } = useContext(CartContext)
    // console.log(cart);
    let { userToken, setUserToken } = useContext(UserContext);
    let navigate = useNavigate()
    function logOut() {
        localStorage.removeItem('token');
        setUserToken(null)
        navigate('/login')
    }
    return <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="fresh cart logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {userToken !== null ? <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/products">Products</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/categories">Categories</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/brands">Brands</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/allOrders">My Orders</NavLink>
                            </li>
                        </> : ''}

                    </ul>
                    <ul className="navbar-nav align-items-center ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to={'/cart'} className="fa-solid fa-basket-shopping text-black text-decoration-none fa-2x cursor-pointer m-3 p-1 position-relative">
                                <span className='position-absolute translate-middle bg-main top-0 start-100 w-50 h-50 py-1 ps-2 text-white rounded-1  font-sm'>{cart?.numOfCartItems || 0}</span>
                            </Link>
                            <Link to={'/wishlist'} className="fas fa-heart text-black text-decoration-none fa-2x cursor-pointer m-3 p-1">
                            </Link>
                            <i className='fab text-info-emphasis fa-facebook mx-2'></i>
                            <i className='fab text-black fa-x-twitter mx-2'></i>
                            <i className='fab text-success fa-whatsapp mx-2'></i>
                            <i className='fab text-danger-emphasis fa-instagram mx-2'></i>
                            <i className='fab text-danger fa-youtube mx-2'></i>
                        </li>
                        {userToken !== null ? <li className="nav-item">
                            <span onClick={() => { logOut() }} className="nav-link cursor-pointer">Log Out</span>
                        </li> : <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/register">Register</NavLink>
                            </li>
                        </>}
                    </ul>
                </div>
            </div>
        </nav>
    </>

}
