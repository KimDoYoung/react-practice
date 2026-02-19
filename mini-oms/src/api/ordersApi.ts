import apiClient from "../lib/apiClient";
import type { Order } from "../types";

// READ
export const fetchOrders = async (): Promise<Order[]> => {
    const {data} = await apiClient.get<Order[]>('/orders');
    return data;
}

// CREATE
export const createOrder = async (order: Omit<Order, 'id'>): Promise<Order> => {
    const {data} = await apiClient.post<Order>('/orders', order);
    return data;
}

// UPDATE
export const updateOrder = async (order: Order): Promise<Order> => {
    const {data} = await apiClient.put<Order>(`/orders/${order.id}`, order);
    return data;
}

// DELETE
export const deleteOrder = async (orderId: number): Promise<void> => {
    await apiClient.delete(`/orders/${orderId}`);
}

