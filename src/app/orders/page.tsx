"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { AiOutlineClose } from "react-icons/ai";

const socket = io("http://localhost:8000");

type Order = {
  _id: string;
  orderId: string;
  createdAt: string;
  status: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    available: boolean;
    _id: string;
  }>;
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Function to fetch orders from backend every 40s
  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:8000/pending-orders");
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders(); // Fetch on load
    const interval = setInterval(fetchOrders, 40000); // Fetch every 40s

    // Listen for new real-time orders
    socket.on("new_order", (newOrder: Order) => {
      setOrders((prevOrders) => [...prevOrders, newOrder]); // Add new order to list
    });

    return () => {
      clearInterval(interval);
      socket.off("new_order");
    };
  }, []);

  const openModal = (order: Order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const response = await fetch(`http://localhost:8000/update-order/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status } : order
          )
        );
      }
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Pending Orders</h1>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order._id} className="border p-4 mb-2 rounded-lg shadow">
              <p><strong>Order ID:</strong> {order.orderId}</p>
              <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <h3>Items:</h3>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>{item.name} - {item.quantity}</li>
                ))}
              </ul>
              <div className="mt-4 flex gap-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => openModal(order)}
                >
                  View Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pending orders.</p>
      )}

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
                className="absolute top-3 right-3 bg-gray-500 text-white p-2 rounded-full hover:bg-gray-700"
                onClick={() => setShowModal(false)}
                >
                <AiOutlineClose size={16} />
            </button>
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Created At:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
            <h3 className="mt-4 font-semibold">Items:</h3>
            <ul>
              {selectedOrder.items.map((item, index) => (
                <li key={index}>{item.name} - {item.quantity}</li>
              ))}
            </ul>

            <h3 className="mt-4 font-semibold">Total Price:</h3>

            <div className="mt-4 flex justify-between">
                <button 
                    className="bg-yellow-500 text-white px-4 py-2 mr-2"
                    onClick={() => updateOrderStatus(selectedOrder._id, "processing")}
                >
                    Process
                </button>
                <button 
                    className="bg-green-500 text-white px-4 py-2 mr-2"
                    onClick={() => updateOrderStatus(selectedOrder._id, "completed")}
                >
                    Complete
                </button>
                <button 
                    className="bg-red-500 text-white px-4 py-2 mr-2"
                    onClick={() => updateOrderStatus(selectedOrder._id, "cancelled")}
                >
                    Cancel
                </button>
                <button onClick={() => window.print()} className="bg-gray-500 text-white px-4 py-2">Print</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
