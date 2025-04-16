import React, { useEffect, useState } from 'react';
import { deleteOrder, getOrders, updateOrderStatus } from '../../services/orderServises';
import { useTranslation } from 'react-i18next';

export default function OrderMangment() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updated = updateOrderStatus(id, newStatus);
    setOrders(updated);
  };

  const handleDelete = (id) => {
    deleteOrder(id);
    setOrders(getOrders());
  };

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  return (
    <div className="container my-4">
      <h2 className="mb-4">{t("orders.title")}</h2>

      {/* Filters */}
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">{t("orders.filterLabel")}</label>
        <div className="col-sm-4">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">{t("orders.status.all")}</option>
            <option value="pending">{t("orders.status.pending")}</option>
            <option value="processing">{t("orders.status.processing")}</option>
            <option value="shipped">{t("orders.status.shipped")}</option>
            <option value="delivered">{t("orders.status.delivered")}</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>{t("orders.table.id")}</th>
              <th>{t("orders.table.user")}</th>
              <th>{t("orders.table.items")}</th>
              <th>{t("orders.table.total")}</th>
              <th>{t("orders.table.status")}</th>
              <th>{t("orders.table.update")}</th>
              <th>{t("orders.table.delete")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.userName}</td>
                <td>
                  <ul className="mb-0">
                    {order.items.map((item, index) => (
                      <li key={index}>{item.name}</li>
                    ))}
                  </ul>
                </td>
                <td>{order.total}</td>
                <td>{t(`orders.status.${order.status}`)}</td>
                <td>
                  <select
                    className="form-select"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="pending">{t("orders.status.pending")}</option>
                    <option value="processing">{t("orders.status.processing")}</option>
                    <option value="shipped">{t("orders.status.shipped")}</option>
                    <option value="delivered">{t("orders.status.delivered")}</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(order.id)}
                  >
                    {t("orders.table.delete")}
                  </button>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center">
                  {t("orders.table.noOrders")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
