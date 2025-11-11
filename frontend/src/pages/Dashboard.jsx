import React, { useEffect, useState } from "react";
import { getOrders } from "../api/orders";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders("aniket-1000002.myshopify.com");
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recent Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Customer</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-center">
                <td className="border p-2">{order.id}</td>
                <td className="border p-2">{order.customer_name}</td>
                <td className="border p-2">${order.total_price}</td>
                <td className="border p-2">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => navigate(`/order/${order.id}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
