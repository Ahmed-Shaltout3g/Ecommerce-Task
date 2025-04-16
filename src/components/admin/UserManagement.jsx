import React, { useState, useEffect } from "react";
import { getUsers, addUser, deleteUser } from "../../services/userService";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next"; // استيراد useTranslation

export default function UserManagement() {
    const { t } = useTranslation(); // استخدام useTranslation

    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: "", email: "", role: "customer" });

    useEffect(() => {
        setUsers(getUsers());
    }, []);

    const handleAddUser = () => {
        if (!form.name || !form.email || !form.role) {
            toast.error(t("userManagement.form.error"));
            return;
        }

        const newUser = { ...form, id: uuidv4() };
        addUser(newUser);
        setUsers(getUsers());
        setForm({ name: "", email: "", role: "customer" });
        toast.success(t("userManagement.form.success"));
    };

    const handleDelete = (id) => {
        deleteUser(id);
        setUsers(getUsers());
        toast.info(t("userManagement.table.userDeleted"));
    };

    return (
        <div className="container mt-5">
            <h3 className="mb-4">{t("userManagement.title")}</h3>

            {/* Form */}
            <div className="row g-2 mb-4">
                <div className="col-md-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder={t("userManagement.form.name")}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder={t("userManagement.form.email")}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div>
                <div className="col-md-2">
                    <select
                        className="form-select"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                    >
                        <option value="customer">{t("userManagement.form.user")}</option>
                        <option value="admin">{t("userManagement.form.admin")}</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <button className="btn btn-primary w-100" onClick={handleAddUser}>
                        {t("userManagement.form.addUser")}
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="table-responsive">
                <table className="table table-striped table-bordered text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>{t("userManagement.table.name")}</th>
                            <th>{t("userManagement.table.email")}</th>
                            <th>{t("userManagement.table.role")}</th>
                            <th>{t("userManagement.table.action")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, idx) => (
                                <tr key={user.id}>
                                    <td>{idx + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            {t("userManagement.table.delete")}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-muted">
                                    {t("userManagement.table.noUsers")}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
