import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const { data } = await axios.get(`http://localhost:5002/api/orders/${orderId}`);
        setOrder(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [orderId]);

  if (loading) return <Loader />;
  if (!order) return <p className="text-center text-red-500 mt-10">Order not found</p>;

  return (
    <div className="container mx-auto p-6">
      {/* Order Info */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Order #{order.name}</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 text-gray-700">
          <p><span className="font-semibold">Shop:</span> {order.shop}</p>
          <p><span className="font-semibold">Customer:</span> {order.customer_name}</p>
          <p><span className="font-semibold">Total:</span> ${order.total_price}</p>
          <p><span className="font-semibold">Status:</span> 
            <span className={`ml-2 px-2 py-1 rounded text-white ${order.status === 'paid' ? 'bg-green-500' : 'bg-yellow-500'}`}>
              {order.status}
            </span>
          </p>
          <p><span className="font-semibold">Created At:</span> {new Date(order.created_at).toLocaleString()}</p>
        </div>
      </div>

      {/* Fulfilment Items */}
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Fulfilment Items</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {order.items?.map((item, i) => (
          <div key={i} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <img
              src={item.imageurl}
              alt={`item-${i}`}
              className="w-40 h-40 object-cover rounded mb-4"
            />
            <p className="font-semibold">{item.lineitemid}</p>
            <p>Quantity: {item.qty}</p>
            <p className="text-red-500 mt-2 text-center">{item.reason}</p>
          </div>
        ))}
      </div>

      {/* All Images */}
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">All Images</h3>
      <div className="flex flex-wrap gap-4">
        {order.images?.map((img, i) => (
          <img
            key={i}
            src={img.imageurl}
            alt={`image-${i}`}
            className="w-40 h-40 object-cover rounded shadow-md"
          />
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
