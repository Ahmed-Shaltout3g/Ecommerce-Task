const ORDER_KEY = "orders";

export function getOrders() {
  const data = localStorage.getItem(ORDER_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveOrders(orders) {
  localStorage.setItem(ORDER_KEY, JSON.stringify(orders));
}

export function addOrder(newOrder) {
  const orders = getOrders();
  orders.push(newOrder);
  saveOrders(orders);
}

export function updateOrderStatus(orderId, newStatus) {
  const orders = getOrders();
  const updatedOrders = orders.map((order) =>
    order.id === orderId ? { ...order, status: newStatus } : order
  );
  saveOrders(updatedOrders);
  return updatedOrders;
}

export function deleteOrder(orderId) {
  const orders = getOrders();
  const updatedOrders = orders.filter((order) => order.id !== orderId);
  saveOrders(updatedOrders);
}
