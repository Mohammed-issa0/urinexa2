import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // مسار ملف التهيئة
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, "orders"); // اسم المجموعة
        const ordersSnapshot = await getDocs(ordersCollection);
        const ordersList = ordersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  });

  const handleProcessOrder = async (orderId) => {
    try {
      const orderDoc = doc(db, "orders", orderId); // مرجع الطلب
      await updateDoc(orderDoc, { processed: true }); // تحديث الحالة
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, processed: true } : order
        )
      );
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  if (loading) {
    return <p>جاري تحميل الطلبات...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">قائمة الطلبات</h1>
      {orders.length === 0 ? (
        <p>لا توجد طلبات حاليًا.</p>
      ) : (
        <>
          {/* جدول الطلبات غير المعالجة */}
          <h2 className="text-xl font-bold mb-4">الطلبات غير المعالجة</h2>
          <table className="table-auto w-full border-collapse border border-gray-400 mb-8">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">الاسم</th>
                <th className="border border-gray-300 p-2">رقم الهاتف</th>

                <th className="border border-gray-300 p-2">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {orders
                .filter((order) => !order.processed)
                .map((order) => (
                  <tr key={order.id}>
                    <td className="border border-gray-300 p-2">{order.name}</td>
                    <td className="border border-gray-300 p-2">
                      {order.phone}
                    </td>

                    <td className="border border-gray-300 p-2">
                      <button
                        onClick={() => handleProcessOrder(order.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        تمت معالجة الطلب
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* جدول الطلبات المعالجة */}
          <h2 className="text-xl font-bold mb-4">الطلبات المعالجة</h2>
          <table className="table-auto w-full border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">الاسم</th>
                <th className="border border-gray-300 p-2">رقم الهاتف</th>
              </tr>
            </thead>
            <tbody>
              {orders
                .filter((order) => order.processed)
                .map((order) => (
                  <tr key={order.id}>
                    <td className="border border-gray-300 p-2">{order.name}</td>
                    <td className="border border-gray-300 p-2">
                      {order.phone}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default OrdersPage;
