import React, { useEffect, useState } from "react";
import {
    addProduct,
    deleteProduct,
    getProducts,
    updateProduct,
} from "../../services/productService";
import { useTranslation } from "react-i18next";

export default function ProductManagement() {
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        mrp: "",
        discount: "",
        img: "",
        category: "",
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        setProducts(getProducts());
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingId) {
            updateProduct({ ...formData, id: editingId });
        } else {
            addProduct(formData);
        }

        setProducts(getProducts());
        setFormData({
            name: "",
            price: "",
            mrp: "",
            discount: "",
            img: "",
            category: "",
        });
        setEditingId(null);
    };

    const handleEdit = (product) => {
        setFormData(product);
        setEditingId(product.id);
    };

    const handleDelete = (id) => {
        deleteProduct(id);
        setProducts(getProducts());
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">{t("productManagement.title")}</h2>

            {/* Product Form */}
            <form className="row g-3 mb-4" onSubmit={handleSubmit}>
                {[
                    { name: "name", col: 6 },
                    { name: "price", col: 3 },
                    { name: "mrp", col: 3 },
                    { name: "discount", col: 3 },
                    { name: "category", col: 3 },
                    { name: "img", col: 6 },
                ].map((field) => (
                    <div className={`col-md-${field.col}`} key={field.name}>
                        <input
                            type="text"
                            className="form-control"
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            placeholder={t(`productManagement.form.${field.name}`)}
                            required={["name", "price"].includes(field.name)}
                        />
                    </div>
                ))}

                <div className="col-12 text-end">
                    <button className="btn btn-success" type="submit">
                        {editingId
                            ? t("productManagement.form.updateProduct")
                            : t("productManagement.form.addProduct")}
                    </button>
                </div>
            </form>

            {/* Products Table */}
            <div className="table-responsive">
                <table className="table table-bordered table-striped align-middle text-center">
                    <thead className="table-dark">
                        <tr>
                            {[
                                "image",
                                "name",
                                "price",
                                "mrp",
                                "discount",
                                "category",
                                "actions",
                            ].map((col) => (
                                <th key={col}>{t(`productManagement.table.${col}`)}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {products.length ? (
                            products.map((prod) => (
                                <tr key={prod.id}>
                                    <td>
                                        <img
                                            src={prod.img}
                                            alt={prod.name}
                                            style={{ width: "70px", height: "auto" }}
                                            className="img-fluid rounded"
                                        />
                                    </td>
                                    <td>{prod.name}</td>
                                    <td>{prod.price}</td>
                                    <td>{prod.mrp}</td>
                                    <td>{prod.discount}</td>
                                    <td>{prod.category}</td>
                                    <td>
                                        <div className="d-flex justify-content-center gap-2 flex-wrap">
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() => handleEdit(prod)}
                                            >
                                                ✏️ {t("productManagement.table.edit")}
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDelete(prod.id)}
                                            >
                                                🗑️ {t("productManagement.table.delete")}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center text-muted">
                                    {t("productManagement.table.noProducts")}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
