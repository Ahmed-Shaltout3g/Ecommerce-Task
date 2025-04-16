import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProductCard from "../components/products/ProductCard";

export default function ProductsPage() {
    const { t } = useTranslation();
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("admin_products")) || [];
        setProducts(storedProducts);
    }, []);

    const categories = [...new Set(products.map((p) => p.category))];

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category ? product.category === category : true;
        const price = parseFloat(product.price.replace(',', ''));
        const matchesMin = minPrice ? price >= parseFloat(minPrice) : true;
        const matchesMax = maxPrice ? price <= parseFloat(maxPrice) : true;

        return matchesSearch && matchesCategory && matchesMin && matchesMax;
    });

    return (
        <div className="container mt-4">
            <h2 className="mb-4">{t("allProducts")}</h2>

            {/* Filters */}
            <div className="row mb-4 g-3">
                <div className="col-md-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder={t("searchPlaceholder")}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="col-md-3">
                    <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">{t("allCategories")}</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-2">
                    <input
                        type="number"
                        className="form-control"
                        placeholder={t("minPrice")}
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                </div>

                <div className="col-md-2">
                    <input
                        type="number"
                        className="form-control"
                        placeholder={t("maxPrice")}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>
            </div>

            {/* Products */}
            <div className="row g-4">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id} className="col-md-3">
                            <ProductCard product={product} />
                        </div>
                    ))
                ) : (
                    <p className="text-muted">{t("noProducts")}</p>
                )}
            </div>
        </div>
    );
}
