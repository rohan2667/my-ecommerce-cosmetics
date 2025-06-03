import React, { useState } from 'react';
import { useCart } from './CartContext';
import { FaTrash } from 'react-icons/fa';

const AddressInput = ({ label, name, type, value, onChange }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-600">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
      required
    />
  </div>
);

export default function CheckoutPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [address, setAddress] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [shippingId, setShippingId] = useState(1);
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [paymentMethodId, setPaymentMethodId] = useState(1);

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const applyVoucher = () => {
    if (voucherCode.toLowerCase() === 'SAVE50') setVoucherApplied(true);
  };

  const placeOrder = () => {
    alert('Order placed successfully!');
    clearCart();
  };

  const shippingOptions = [
    { id: 1, name: 'Standard Shipping', cost: 5.99, estimated: '3-5 days' },
    { id: 2, name: 'Express Delivery', cost: 12.99, estimated: '1-2 days' },
  ];

  const paymentMethods = [
    { id: 1, name: 'Credit/Debit Card' },
    { id: 2, name: 'Cash on Delivery' },
    { id: 3, name: 'UPI / Netbanking' },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const shippingCost = shippingOptions.find((s) => s.id === shippingId)?.cost || 0;
  const discount = voucherApplied ? subtotal * 0.5 : 0;
  const total = subtotal + shippingCost - discount;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">
      {/* CART SECTION */}
      <section>
        <h2 className="text-3xl font-semibold mb-6">🛒 Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between p-4 bg-white rounded shadow"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ADDRESS & SHIPPING */}
      <section className="bg-white rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
          <form className="space-y-4">
            {[
              { label: 'Full Name', name: 'fullName', type: 'text' },
              { label: 'Email', name: 'email', type: 'email' },
              { label: 'Phone Number', name: 'phone', type: 'tel' },
              { label: 'Street Address', name: 'street', type: 'text' },
              { label: 'City', name: 'city', type: 'text' },
              { label: 'State / Province', name: 'state', type: 'text' },
              { label: 'ZIP / Postal Code', name: 'zip', type: 'text' },
              { label: 'Country', name: 'country', type: 'text' },
            ].map((field) => (
              <AddressInput
                key={field.name}
                {...field}
                value={address[field.name]}
                onChange={handleAddressChange}
              />
            ))}
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Shipping Options</h2>
          <ul className="space-y-4">
            {shippingOptions.map(({ id, name, cost, estimated }) => (
              <li key={id}>
                <label className="flex items-center space-x-4 cursor-pointer">
                  <input
                    type="radio"
                    checked={shippingId === id}
                    onChange={() => setShippingId(id)}
                    className="form-radio text-pink-600"
                  />
                  <div>
                    <p className="font-semibold">{name}</p>
                    <p className="text-sm text-gray-500">
                      ${cost.toFixed(2)} — {estimated}
                    </p>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* VOUCHER & PAYMENT */}
      <section className="bg-white rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Referral Voucher Code</h2>
          <div className="flex max-w-md space-x-3">
            <input
              type="text"
              placeholder="Enter voucher code"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
            <button
              onClick={applyVoucher}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 rounded transition"
            >
              Apply
            </button>
          </div>
          {voucherApplied && (
            <p className="text-green-600 mt-2 font-semibold">
              Voucher applied! 50% discount.
            </p>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Payment Options</h2>
          <ul className="space-y-4 max-w-md">
            {paymentMethods.map(({ id, name }) => (
              <li key={id}>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    checked={paymentMethodId === id}
                    onChange={() => setPaymentMethodId(id)}
                    className="form-radio text-pink-600"
                  />
                  <span>{name}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ORDER SUMMARY */}
      <section className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <p className="text-gray-700 mb-2">
          Subtotal: <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </p>
        <p className="text-gray-700 mb-2">
          Shipping: <span className="font-semibold">${shippingCost.toFixed(2)}</span>
        </p>
        {voucherApplied && (
          <p className="text-green-600 mb-2">
            Discount: <span className="font-semibold">-${discount.toFixed(2)}</span>
          </p>
        )}
        <hr className="my-4" />
        <p className="text-xl font-bold text-pink-600">
          Total: ${total.toFixed(2)}
        </p>

        <button
          className="mt-6 w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded font-semibold transition"
          onClick={placeOrder}
        >
          Place Order
        </button>
      </section>
    </div>
  );
}
