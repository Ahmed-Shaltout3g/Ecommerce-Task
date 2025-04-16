import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function OrderCard({ orders = [] }) {
    const { t } = useTranslation();
    const [reload, setReload] = useState(false)
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle text-center">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>{t("orderID")}</th>
                        <th>{t("date")}</th>
                        <th>{t("status")}</th>
                        <th>{t("items")}</th>
                        <th>{t("total")}</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order.id}>
                            <td>{index + 1}</td>
                            <td>#{order.id}</td>
                            <td>{order.date}</td>
                            <td>
                                <span className={`badge bg-${getStatusColor(order.status)}`}>
                                    {t(`${order.status.toLowerCase()}`)}
                                </span>
                            </td>
                            <td className="text-start">
                                <ul className="list-unstyled mb-0">
                                    {order.items.map((item, i) => (
                                        <li key={i}>
                                            {item.name} - ${item.price}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>${order.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function getStatusColor(status) {
    switch (status.toLowerCase()) {
        case 'pending': return 'warning';
        case 'shipped': return 'primary';
        case 'delivered': return 'success';
        case 'cancelled': return 'danger';
        default: return 'secondary';
    }
}
