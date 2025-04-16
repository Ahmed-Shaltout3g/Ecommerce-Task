import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import style from './Product.module.css';
import { favariteContext } from '../../context/FavariteContext';
import { cartContext } from '../../context/CartContext';

export default function ProductCard({ product }) {
    const { addToCart, cards } = useContext(cartContext);
    const { favItems, addToFav } = useContext(favariteContext);

    return (
        <div className={`${style.card} bg-white border p-2 rounded shadow-sm h-100`}>
            <Link className="text-dark text-decoration-none" to={`/details/${product.id}`}>
                {product.img ? (
                    <img className="w-100" src={product.img} alt={product.name} />
                ) : (
                    <div className="h-100 d-flex justify-content-center align-items-center">
                        <div className="spinner-grow" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
            </Link>

            <div className="d-flex justify-content-between align-items-center px-2 mt-3">
                <h5 className="m-0">{product.price}$</h5>
                {Array.from(new Set(favItems?.map((element) => element.name))).includes(product.name) ? (
                    <i className="fa-solid text-danger fa-heart fa-xl"></i>
                ) : (
                    <div onClick={() => { addToFav(product) }}>
                        <i className="fa-regular pointer fa-heart fa-beat-fade fa-xl"></i>
                    </div>
                )}
            </div>

            <div className="d-flex justify-content-between align-items-center px-2 mt-2">
                <span className="text-danger fw-bold rounded-5 px-2 py-1">
                    {product.discount ? `-${product.discount}` : 'No Discount'}
                </span>
                {Array.from(new Set(cards?.map((element) => element.name))).includes(product.name) ? (
                    <i className="fa-regular fa-circle-check fa-xl text-success"></i>
                ) : (
                    <div onClick={() => { addToCart(product) }}>
                        <i className="fa-solid pointer fa-cart-arrow-down fa-beat fa-xl"></i>
                    </div>
                )}
            </div>
        </div>
    );
}
