import axios from "axios";

export const getOrders = async () => axios.get("http://localhost:8000/orders");
export const getOrderById = async (id: string) => axios.get(`http://localhost:8000/order/${id}`);
export const getStats = async () => axios.get("http://localhost:8000/stats");
