import React, { useEffect, useState } from "react";
import { fetchOrders, syncOrders } from "../api/orders";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const OrderList = ({ shop }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (shop) {
      loadOrders();
    }
  }, [shop]);

  const loadOrders = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const data = await fetchOrders(shop);
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setMessage({ type: "error", text: "Failed to load orders." });
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    if (!shop) {
      setMessage({ type: "error", text: "No shop selected. Cannot sync orders." });
      return;
    }

    setSyncing(true);
    setMessage(null);
    try {
      const res = await syncOrders(shop);
      setMessage({ type: "success", text: res.message || "Orders synced successfully!" });
      await loadOrders(); // Refresh orders after syncing
    } catch (err) {
      console.error("Error syncing orders:", err);
      setMessage({ type: "error", text: "Failed to sync orders." });
    } finally {
      setSyncing(false);
    }
  };

  // Show error if no shop selected
  if (!shop) return <p className="p-4 text-red-500">No shop selected.</p>;
  if (loading) return <Loader />;

  return (
    <div className="p-4">
      {/* Header & Sync Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Last 60 Days Orders</h2>
        <button
          className={`bg-green-500 text-white px-4 py-2 rounded flex items-center ${
            syncing ? "opacity-70 cursor-not-allowed" : ""
          }`}
          onClick={handleSync}
          disabled={syncing}
        >
          {syncing && <span className="loader mr-2"></span>}
          {syncing ? "Syncing..." : "Sync Orders"}
        </button>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div
          className={`mb-4 p-2 rounded ${
            message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Orders Table */}
      {orders.length === 0 ? (
        <p>No orders found for this shop.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-2 py-1">Order ID</th>
                <th className="border px-2 py-1">Customer</th>
                <th className="border px-2 py-1">Status</th>
                <th className="border px-2 py-1">Total</th>
                <th className="border px-2 py-1">Created At</th>
                <th className="border px-2 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="border px-2 py-1">{order.shopify_order_id}</td>
                  <td className="border px-2 py-1">{order.customer_name}</td>
                  <td className="border px-2 py-1">{order.status}</td>
                  <td className="border px-2 py-1">
                    ${Number(order.total_price || 0).toFixed(2)}
                  </td>
                  <td className="border px-2 py-1">
                    {new Date(order.created_at).toLocaleString()}
                  </td>
                  <td className="border px-2 py-1">
                    <Link
                      to={`/order/${order.shopify_order_id}`}
                      state={{ shop }}
                      className="text-blue-500 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Loader Spinner */}
      <style>{`
        .loader {
          border: 2px solid #f3f3f3;
          border-top: 2px solid #fff;
          border-radius: 50%;
          width: 14px;
          height: 14px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default OrderList;
