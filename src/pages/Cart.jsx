import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cartContext } from '../context/CartContext';
import { orderContext } from '../context/OrderContect';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next'; // إضافة الترجمة

export default function Cart() {
    const { setTotalPrice, totalPrice, cards, removeItemsCart, clearAllItems } = useContext(cartContext);
    const { placeOrder } = useContext(orderContext);
    const user = JSON.parse(localStorage.getItem('currentUser'));

    const { t } = useTranslation();

    useEffect(() => {
        if (cards.length > 0) {
            const newTotalPrice = cards.reduce((acc, item) => acc + parseFloat(item.price.replace(',', '')), 0);
            setTotalPrice(newTotalPrice);
        } else {
            setTotalPrice(0);
        }
    }, [cards, setTotalPrice]);

    const handlePlaceOrder = () => {

        if (localStorage.getItem('currentUser') != null) {
            if (!cards.length) {
                return toast.error(t("cartEmptyError"), {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
            }

            placeOrder(cards, user, totalPrice);
            clearAllItems();
            toast.success(t("orderSuccess"), {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        } else {
            toast.error(t("Login First"), {
                position: "top-center",
            });
        }

    };

    return (
        <>
            <div className="container mt-5">
                <ToastContainer />

                {cards?.length > 0 && (
                    <div className="d-flex justify-content-end w-100">
                        <button onClick={clearAllItems} className="btn btn-danger h6 px-5">
                            {t("clearAll")} <i className="ps-3 fa-solid fa-trash"></i>
                        </button>
                    </div>
                )}

                <div className="row g-4">
                    {!cards?.length ? (
                        <p className="h3 text-danger my-5">{t("emptyCart")}</p>
                    ) : (
                        cards.map((item, index) => (
                            <div key={index} className="col-md-3 grid-box">
                                <div className="bg-white border-1 border">
                                    {item.img ? (
                                        <img className="w-100" src={item.img} alt="" />
                                    ) : (
                                        <div className="h-100 d-flex justify-content-center align-items-center">
                                            <div className="spinner-grow" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="d-flex justify-content-between px-3 my-3">
                                        <h1 className="h5 ps-2">${item.price}</h1>
                                        <div onClick={() => removeItemsCart(item)}>
                                            <i className="fa-regular text-danger pointer fa-2xl fa-trash-can fa-fade"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cards?.length > 0 && (
                    <div className="row justify-content-between mt-5">
                        <div className="col-md-2">
                            <p className="h2">{t("total")}: ${totalPrice}</p>
                        </div>
                        <div className="col-md-2">
                            <Link className="btn-success" to="/orders">
                                <button onClick={handlePlaceOrder} className="btn btn-success">
                                    {t("addOrder")}
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
