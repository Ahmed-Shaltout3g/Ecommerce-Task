import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-colored.png';
import { useLanguageDirection } from '../../hooks/Language';
import { favariteContext } from '../../context/FavariteContext';
import { cartContext } from '../../context/CartContext';

export default function NavbarCustomer() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    let { countCarts } = useContext(cartContext)

    let { countFav } = useContext(favariteContext)

    const { userData, isRTL, toggleLanguage } = useLanguageDirection();



    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    return (
        <>
            <nav className={`navbar   navbar-expand-lg bg-light  p-0`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/'><img className='w-100' src={logo} alt="" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse  navbar-collapse  " id="navbarSupportedContent">

                        <ul className={`navbar-nav ${isRTL ? 'me-auto' : 'ms-auto'}  mb-2 mb-lg-0`}>
                            <li className="me-lg-4 nav-item text-center mt-3 ms-2 text-secondary">

                                <button className='text-gray fw-bold btn btn-outline-primary' onClick={toggleLanguage}>
                                    {i18n.language === 'ar' ? t('english') : t('arabic')}
                                </button>
                            </li>

                            <li className={`nav-item text-center mt-2 text-secondary ${isRTL ? 'ms-3' : 'me-3'}`}>
                                <Link to='/products' >
                                    <i className="fa-solid fa-magnifying-glass text-dark"></i>
                                    <p className='text-dark   fw-bold'>{t("Search")}</p>
                                </Link>
                            </li>
                            <li className={`nav-item text-center mt-2 text-secondary ${isRTL ? 'ms-3' : 'me-3'}`}>
                                <Link to='/myfavarite' className='text-secondary' >
                                    <i className="fa-solid fa-heart"></i><span className='p-1 rounded-5 bg-primary text-light'>{countFav}</span>
                                    <p className='text-gray   fw-bold'>{t("Lovers")}</p>
                                </Link>
                            </li>
                            <li className={`nav-item text-center mt-2 text-secondary ${isRTL ? 'ms-3' : 'me-3'}`}>
                                <Link to='/mycart' className='text-secondary'>

                                    <i className="fa-solid fa-cart-shopping"></i><span className='p-1 rounded-5 bg-primary text-light'>{countCarts}</span>
                                    <p className='text-gray fw-bold'>{t("MyCart")}</p>

                                </Link>

                            </li>


                            {localStorage.getItem("currentUser") != null ? <>

                                <li className='d-flex  align-items-center'>
                                    <span onClick={handleLogout} className='nav-link btn-style pointer  text-dark cursor'>{t("Logout")}<i className=" ps-1 fa-solid fa-arrow-right-from-bracket"></i></span>

                                </li>
                            </> : <><li className='ms-lg-4 nav-item text-center pt-2 mt-4 text-secondary'>
                                <Link className=" text-secondary h6" to="/login">{t("Login")}</Link>

                            </li>
                                <li className='ms-lg-4 nav-item text-center pt-2 mt-4 text-secondary'>
                                    <Link className=" text-secondary h6 " to="/register">{t("Register")}</Link>
                                </li></>}




                        </ul>
                    </div>
                </div>
            </nav>
            <hr className='p-0 m-0' />

            <nav className="navbar navbar-expand-lg  bg-light">
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className={`navbar-nav ${isRTL ? 'me-auto' : 'ms-auto'}mb-2 mb-lg-0`}>
                            <li className="nav-item">
                                <Link className="nav-link fw-bolder" aria-current="page" to="/">{t("Home")}</Link>
                            </li>
                            <li className="nav-item ms-2">
                                <Link className="nav-link fw-bolder" to='/products'>{t("Products")}</Link>
                            </li>
                            {JSON.parse(localStorage.getItem("currentUser"))?.role === "customer" ? <li className="nav-item ms-2">
                                <Link className="nav-link fw-bolder" to='/orders'>{t("My Orders")}</Link>
                            </li> : ""}
                        </ul>
                    </div>
                </div>
            </nav>
            <hr className='p-0 m-0' />


        </>
    );
}
