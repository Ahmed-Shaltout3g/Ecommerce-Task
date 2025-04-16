import React from 'react';
import logo from '../../assets/logo-colored.png';
import { Link } from 'react-router-dom';
import { useLanguageDirection } from '../../hooks/Language';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();  // استخدام الترجمة
    const { userData, direction } = useLanguageDirection();  // الحصول على اتجاه اللغة

    return (
        <>
            <section className="footer pt-4 bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="info">
                                <img src={logo} alt="" />
                                <p className="pt-3">Alexandira</p>
                                <p><span className="fw-bold text">phone :</span> 01208073209</p>
                                <p><span className="fw-bold">Email :</span> shaltouta477@gmail.com</p>
                            </div>
                            <div className="social-accounts d-flex">
                                <a className='m-1' href="https://twitter.com/ahmed63g" target="_blank"><i className="fa-brands fa-twitter"></i></a>
                                <a className='m-1' href="https://www.facebook.com/ahmedshaltout3g" target="_blank"><i className="fa-brands fa-facebook"></i></a>
                                <a className='m-1' href="https://www.instagram.com/ahmed_shaltout_3g/" target="_blank"><i className="fa-brands fa-instagram"></i></a>
                                <a className='m-1' href="https://www.linkedin.com/in/ahmed-shaltout-015b85252/" target="_blank"><i className="fa-brands fa-linkedin"></i></a>
                            </div>
                        </div>

                        <div className="footer-link col-lg-6 col-md-6 pb-4">
                            <p className="fw-bold">{t("usefulLinks")}</p>
                            <ul className="p-0">
                                <li>
                                    <Link to="/" className="text-decoration-none">
                                        <i className={`fa-solid fa-arrow-right-long text-dark ${direction === 'rtl' ? 'ms-2' : 'me-2'}`}></i> {/* تغيير اتجاه السهم بناءً على اللغة */}
                                        {t("Home")}
                                    </Link>
                                </li>
                                <li className="pt-3">
                                    <Link to='/products'>
                                        <i className={`fa-solid fa-arrow-right-long text-dark ${direction === 'rtl' ? 'ms-2' : 'me-2'}`}></i> {/* تغيير اتجاه السهم بناءً على اللغة */}
                                        {t("products")}
                                    </Link>
                                </li>
                                <li className="pt-3">
                                    <Link to='/mycart'>
                                        <i className={`fa-solid fa-arrow-right-long text-dark ${direction === 'rtl' ? 'ms-2' : 'me-2'}`}></i>
                                        {t("myCart")}
                                    </Link>
                                </li>
                                <li className="pt-3">
                                    <Link to='/orders'>
                                        <i className={`fa-solid fa-arrow-right-long text-dark ${direction === 'rtl' ? 'ms-2' : 'me-2'}`}></i>
                                        {t("myOrders")}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
