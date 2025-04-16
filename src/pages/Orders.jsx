import React, { useContext, } from 'react';
import OrderCard from '../components/orders/OrderCard';
import { orderContext } from '../context/OrderContect';
import { useTranslation } from 'react-i18next';

export default function Orders() {
    const { orders } = useContext(orderContext);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userOrders = orders.filter(order => order.userEmail === currentUser?.email);
    const { t } = useTranslation();


    return (
        <div className="container mt-5">
            <h3 className="mb-4">{t("myOrders")}</h3>
            {userOrders.length === 0 ? (
                <p className="text-muted">{t("noOrders")}</p>
            ) : (
                <OrderCard orders={userOrders} />
            )}
        </div>
    );
}
