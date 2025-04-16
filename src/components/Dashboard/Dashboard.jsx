import React, { useEffect, useState } from "react";
import { getUsers } from "../../services/userService";
import { getOrders } from "../../services/orderServises";
import { getProducts } from "../../services/productService";
import ProductCharts from "./ProductCharts";
import OrderChart from "./OrderChart";
import UserChart from "./UserChart";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
    const { t } = useTranslation();
    const [userCount, setUserCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [product, setProducts] = useState([JSON.parse(localStorage.getItem("admin_products"))]);

    useEffect(() => {
        setUserCount(getUsers().length);
        setOrderCount(getOrders().length);
        setProductCount(product[0]?.length);
    }, []);

    return (
        <>
            <div className="container mt-5">
                <h3 className="mb-4">{t("dashboard.title")}</h3>
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card text-white bg-primary">
                            <div className="card-body">
                                <h5 className="card-title">{t("dashboard.totalUsers")}</h5>
                                <p className="card-text fs-2">{userCount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-white bg-success">
                            <div className="card-body">
                                <h5 className="card-title">{t("dashboard.totalOrders")}</h5>
                                <p className="card-text fs-2">{orderCount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-white bg-dark">
                            <div className="card-body">
                                <h5 className="card-title">{t("dashboard.totalProducts")}</h5>
                                <p className="card-text fs-2">{productCount}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* charts */}
            <div className="container my-4">
                <div className="row">
                    <div className="col-md-4">
                        <ProductCharts />
                    </div>
                    <div className="col-md-4">
                        <UserChart />
                    </div>
                    <div className="col-md-4">
                        <OrderChart />
                    </div>
                </div>
            </div>
        </>
    );
}
