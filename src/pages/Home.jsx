import React, { useEffect, useState } from 'react'
import Slider from '../components/Header/Slider'
import ProductCard from '../components/products/ProductCard'
import { useTranslation } from 'react-i18next';
// import { product } from '../data/product'

export default function Home() {
    const [products, setProducts] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("admin_products")) || [];
        setProducts(storedProducts);
    }, []);
    return <>
        <Slider />
        <div className='container'>
            <div className="section-title">
                <h2> {t("products")} </h2>
                <p>{t("CHECK OUR Products")} :</p>
            </div>
            <div className="row g-4">
                {
                    products.map((product) => (
                        <div key={product.id} className="col-md-3">
                            <ProductCard product={product} />
                        </div>
                    ))
                }

            </div>
        </div>
    </>
}
