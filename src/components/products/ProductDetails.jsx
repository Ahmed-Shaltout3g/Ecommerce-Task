import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // إضافة الترجمة
import { cartContext } from '../../context/CartContext';
import { favariteContext } from '../../context/FavariteContext';

export default function ProductDetails() {
    const { id } = useParams();
    let { addToCart, cards } = useContext(cartContext);
    let { addToFav, favItems } = useContext(favariteContext);
    const [products, setProducts] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("admin_products")) || [];
        setProducts(storedProducts);
    }, []);

    const selectedProduct = products.find((item) => item.id === parseInt(id));

    if (!selectedProduct) {
        return <div className="container mt-5"><h4>{t("productDetails.productNotFound")}</h4></div>;
    }

    return (
        <div className="container mt-5">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <img src={selectedProduct.img} alt={selectedProduct.name} className="img-fluid rounded shadow" />
                </div>
                <div className="col-md-6">
                    <h3>{selectedProduct.name}</h3>
                    <p className="text-muted"><del>{selectedProduct.mrp}$</del> <span className="text-danger">{selectedProduct.discount} OFF</span></p>
                    <h4 className="text-success">{selectedProduct.price}$</h4>
                    <p className="mt-3">{t("productDetails.category")}: <span className="badge bg-primary">{selectedProduct.category}</span></p>
                    {Array.from(new Set(cards?.map((element) => element.name))).includes(selectedProduct.name)
                        ? <p className='h5 text-success my-3'>{t("productDetails.addedToCart")}<i className="fa-regular fa-sm  ps-2 fa-circle-check"></i></p>
                        : <button onClick={() => { addToCart(selectedProduct) }} className='btnFav bg-transparent border-0 mt-4 text-primary d-block'>
                            <h4 className='h4 fav'>{t("productDetails.addToCart")} <i className="ps-2 fa-solid fa-cart-arrow-down"></i></h4>
                        </button>
                    }
                    {Array.from(new Set(favItems?.map((element) => element.name))).includes(selectedProduct.name)
                        ? <i className=" fa-solid text-danger m-4 fa-heart fa-2xl"></i>
                        : <div onClick={() => { addToFav(selectedProduct) }}>
                            <i className="fa-regular pointer fa-heart fa-beat-fade m-4 fa-2xl"></i>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
