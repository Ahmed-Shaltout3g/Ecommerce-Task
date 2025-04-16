// context/OrderContext.js
import { createContext, useState, useEffect } from 'react';

export const orderContext = createContext();

export default function OrderContextProvider({ children }) {
    const [orders, setOrders] = useState(() => {
        const storedOrders = localStorage.getItem('orders');
        return storedOrders ? JSON.parse(storedOrders) : [];
    });

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    const placeOrder = (cartItems, user, total) => {
        const newOrder = {
            id: Date.now(),
            items: cartItems,
            userEmail: user?.email || 'guest',
            userName: user?.name || 'Guest',
            date: new Date().toLocaleString(),
            status: 'Pending',
            total: total
        };

        setOrders((prevOrders) => [newOrder, ...prevOrders]);
    };

    const updateOrderStatus = (orderId, status) => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === orderId ? { ...order, status } : order
            )
        );
    };

    return (
        <orderContext.Provider value={{ orders, placeOrder, updateOrderStatus }}>
            {children}
        </orderContext.Provider>
    );
}
