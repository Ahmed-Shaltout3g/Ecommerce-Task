import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NavbarAdmin from "../common/NavbarAdmin";
import NavbarCustomer from "../common/NavbarCustomer";
import Footer from "../common/Footer";
import Sidebar from "../Dashboard/Sidebar";

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setRole(user?.role || null);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!role || role === "customer" || isAuthPage ? (
        <div>
          <NavbarCustomer />
          <main>{children}</main>
        </div>
      ) : role === "admin" ? (
        <>
          <NavbarAdmin />
          {/* Toggle button for small screens */}
          <div className="d-md-none text-start p-2 bg-light border-bottom">
            <button
              className="btn btn-dark"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#adminSidebar"
              aria-controls="adminSidebar"
            >
              ☰ {t("layout.menu")}
            </button>
          </div>

          <div className="container-fluid">
            <div className="row">
              <Sidebar handleLogout={handleLogout} />
              <div className="col py-3">
                <main>{children}</main>
              </div>
            </div>
          </div>
        </>
      ) : null}

      <Footer />
    </>
  );
}
