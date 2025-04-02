"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Item {
  name: string;
  quantity: number;
  price?: number;
  available: boolean;
  not_in_stock?: boolean;
}

interface Order {
  _id: string;
  items: Item[];
  status: string;
}

export default function OrderDetails({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order | null>(null);
  const router = useRouter();

  useEffect(() => {
    axios.get(`http://localhost:8000/order/${params.id}`).then((res) => {
      setOrder(res.data);
    });
  }, [params.id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold">Items</h2>
        <ul>
          {order.items.map((item) => (
            <li key={item.name}>
              {item.quantity}x {item.name} - {item.available ? `$${item.price}` : "Not Available"}
            </li>
          ))}
        </ul>
        <p className="mt-4">Status: {order.status}</p>
        <button onClick={() => router.push("/orders")} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Back to Orders
        </button>
      </div>
    </div>
  );
}
