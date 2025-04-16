import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguageDirection } from "../../hooks/Language";

import bootstrapBundleMin from "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Sidebar({ handleLogout }) {
    const { t, i18n } = useTranslation();
    const { toggleLanguage } = useLanguageDirection();
    const navigate = useNavigate();
    const offcanvasRef = useRef(null);

    const closeOffcanvas = () => {
        const offcanvas = bootstrapBundleMin.Offcanvas.getInstance(offcanvasRef.current);
        if (offcanvas) offcanvas.hide();
    };

    const handleNavigate = (to) => {
        navigate(to);
        closeOffcanvas();
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="d-none d-md-block col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark text-white min-vh-100">
                <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2">
                    <Link to="/dashboard" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                        <span className="fs-5 d-none d-sm-inline fw-bold">{t("layout.brandDashboard")}</span>
                    </Link>
                    <hr className="text-white w-100 m-0 p-0" />

                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100">
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-link px-0 align-middle  ">
                                <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">{t("layout.home")}</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/mangment-orders" className="nav-link px-0 align-middle  ">
                                <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">{t("layout.managementOrders")}</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/mangment-products" className="nav-link px-0 align-middle ">
                                <i className="fs-4 bi-grid"></i> <span className="ms-1 d-none d-sm-inline">{t("layout.managementProducts")}</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/mangment-users" className="nav-link px-0 align-middle  ">
                                <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">{t("layout.users")}</span>
                            </Link>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="btn btn-link nav-link px-0 align-middle  ">
                                <i className="bi bi-box-arrow-left"></i> <span className="ms-1 d-none d-sm-inline">{t("layout.logout")}</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={toggleLanguage} className="btn btn-link nav-link px-0 align-middle  ">
                                <i className="bi bi-translate"></i> <span className="ms-1 d-none d-sm-inline">{i18n.language === "ar" ? t("english") : t("arabic")}</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div
                ref={offcanvasRef}
                className="offcanvas offcanvas-start bg-dark text-white"
                tabIndex="-1"
                id="adminSidebar"
                aria-labelledby="adminSidebarLabel"
                dir={i18n.dir()}
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="adminSidebarLabel">{t("layout.brandDashboard")}</h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="nav flex-column">
                        <li><button className="btn  nav-link text-white text-start" onClick={() => handleNavigate("/dashboard")}>{t("layout.home")}</button></li>
                        <li><button className="btn nav-link text-white text-start" onClick={() => handleNavigate("/mangment-orders")}>{t("layout.managementOrders")}</button></li>
                        <li><button className="btn nav-link text-white text-start" onClick={() => handleNavigate("/mangment-products")}>{t("layout.managementProducts")}</button></li>
                        <li><button className="btn nav-link text-white text-start" onClick={() => handleNavigate("/mangment-users")}>{t("layout.users")}</button></li>
                        <li><button onClick={() => { handleLogout(); closeOffcanvas(); }} className="btn nav-link text-white text-start">{t("layout.logout")}</button></li>
                        <li><button onClick={() => { toggleLanguage(); closeOffcanvas(); }} className="btn nav-link text-white text-start">{i18n.language === "ar" ? t("english") : t("arabic")}</button></li>
                    </ul>
                </div>
            </div>
        </>
    );
}
