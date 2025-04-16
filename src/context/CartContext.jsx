import React, { createContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
// import { authContext } from './AuthContext';
import position from './../../node_modules/dom-helpers/esm/position';

export let cartContext = createContext('');
export default function CartContextProvider(props) {
    let [cards, setcards] = useState(JSON.parse(localStorage.getItem("cartItems")) || [])
    let [countCarts, setcountCarts] = useState(Array.from(new Set(cards)).length || 0)

    let [totalPrice, setTotalPrice] = useState(0);
    let [islogin, setislogin] = useState(false);
    const { t } = useTranslation();


    useEffect(() => {

        if (JSON.parse(localStorage.getItem('cartItems')) != null) {
            setcards(Array.from(new Set(JSON.parse(localStorage.getItem('cartItems')).map(el => JSON.stringify(el)))).map(el => JSON.parse(el)))
            console.log(countCarts);




        }




    }, [])


    function addToCart(productData) {
        if (localStorage.getItem('currentUser') != null) {

            cards.push(productData);
            localStorage.setItem('cartItems', JSON.stringify(Array.from(new Set(cards.map(JSON.stringify))).map(JSON.parse)))
            setcountCarts(Array.from(new Set(cards)).length)





        } else {
            setislogin(true)
            toast.error(t("Login First", {
                position: "top-center",
            }
            ));
        }

    }
    function clearAllItems() {
        localStorage.removeItem('cartItems')
        setcards([])
        setcountCarts(0)

    }

    function removeItemsCart(item) {
        if (cards.length == 1) {
            clearAllItems()

        } else {
            let arr = cards.filter((ele) => { return ele != item })
            console.log(arr);
            setcards(arr)

            localStorage.setItem('cartItems', JSON.stringify(arr))
            setcountCarts(countCarts - 1)

        }


    }


    return <>
        <cartContext.Provider value={{ addToCart, islogin, setislogin, removeItemsCart, clearAllItems, clearAllItems, setcountCarts, cards, setcards, countCarts, setTotalPrice, totalPrice }}>
            {props.children}
        </cartContext.Provider>

    </>
}
