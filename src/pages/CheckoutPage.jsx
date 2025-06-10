import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import Layout from "../layouts/Layout";
import { FaTrashAlt, FaPaypal, FaCreditCard } from "react-icons/fa";

const CheckoutPage = () => {
  const {
    cart,
    clearCart,
    removeFromCart,
    updateQuantity: updateQuantityInCart,
  } = useCart();

  const [address, setAddress] = useState({
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    phone: "",
  });

  const [shippingOption, setShippingOption] = useState("standard");
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  const SHIPPING_RATES = {
    standard: 5,
    express: 15,
  };

  const VOUCHER_CODE = "save50";
  const VOUCHER_DISCOUNT = 0.5;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = SHIPPING_RATES[shippingOption] || 0;
  const discount = voucherApplied ? subtotal * VOUCHER_DISCOUNT : 0;
  const total = subtotal + shippingCost - discount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyVoucher = () => {
    if (voucherCode.toLowerCase() === VOUCHER_CODE && !voucherApplied) {
      setVoucherApplied(true);
    }
  };

  const handleRemoveVoucher = () => {
    setVoucherApplied(false);
    setVoucherCode("");
  };

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    clearCart();
  };

  const updateQuantity = (item, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantityInCart(item, newQuantity);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-5 bg-gradient-to-b from-pink-50 to-white min-h-screen">
        <h1 className="text-4xl font-extrabold text-center text-pink-700 mb-8 drop-shadow-md">
          Checkout
        </h1>

        <div className="flex gap-12 justify-center">
          {/* Left Column */}
          <div className="space-y-10">
            {/* Shipping Address */}
            <section className="bg-gradient-to-b from-pink-50 to-pink-100 rounded-3xl shadow-xl border border-pink-200 p-8 transition hover:shadow-2xl">
              <h2 className="text-2xl font-semibold text-pink-700 mb-6 border-b border-pink-200 pb-2">
                Shipping Address
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="First Name"
                  value={address.firstname}
                  onChange={handleInputChange}
                  className="border border-pink-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 outline-none transition"
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Last Name"
                  value={address.lastname}
                  onChange={handleInputChange}
                  className="border border-pink-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 outline-none transition"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={address.phone}
                  onChange={handleInputChange}
                  className="border border-pink-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 outline-none transition"
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={address.country}
                  onChange={handleInputChange}
                  className="border border-pink-300 rounded-lg px-4 py-3 col-span-2 md:col-span-1 focus:ring-2 focus:ring-pink-500 outline-none transition"
                />
                <input
                  type="text"
                  name="address1"
                  placeholder="Address Line 1"
                  value={address.address1}
                  onChange={handleInputChange}
                  className="border border-pink-300 rounded-lg px-4 py-3 col-span-2 focus:ring-2 focus:ring-pink-500 outline-none transition"
                />
                <input
                  type="text"
                  name="address2"
                  placeholder="Address Line 2 (optional)"
                  value={address.address2}
                  onChange={handleInputChange}
                  className="border border-pink-300 rounded-lg px-4 py-3 col-span-2 focus:ring-2 focus:ring-pink-500 outline-none transition"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={address.city}
                  onChange={handleInputChange}
                  className="border border-pink-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 outline-none transition"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={address.state}
                  onChange={handleInputChange}
                  className="border border-pink-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 outline-none transition"
                />
                
              </form>
            </section>

            {/* Payment Method */}
            <section className="bg-gradient-to-b from-pink-50 to-pink-100 rounded-3xl shadow-xl border border-pink-200 p-8 hover:shadow-2xl transition">
              <h3 className="text-2xl font-semibold text-pink-700 mb-6 border-b border-pink-200 pb-2">
                Payment Method
              </h3>
              <div className="space-y-4">
                {["credit_card", "paypal"].map((method) => (
                  <label
                    key={method}
                    className="flex items-center gap-4 cursor-pointer select-none"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-pink-600 w-5 h-5"
                    />
                    <span className="capitalize text-lg font-medium text-pink-600 flex items-center gap-2">
                      {method === "paypal" ? (
                        <FaPaypal className="text-blue-600" />
                      ) : (
                        <FaCreditCard />
                      )}
                      {method.replace("_", " ")}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            {/* Delivery Options */}
            <section className="bg-gradient-to-b from-pink-50 to-pink-100 rounded-3xl shadow-xl border border-pink-200 p-8 hover:shadow-2xl transition">
              <h2 className="text-2xl font-semibold text-pink-700 mb-6 border-b border-pink-200 pb-2">
                Delivery Options
              </h2>
              <div className="space-y-4">
                {Object.entries(SHIPPING_RATES).map(([key, value]) => (
                  <label
                    key={key}
                    className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                      shippingOption === key
                        ? "border-pink-500 bg-pink-50 shadow-md"
                        : "border-pink-200 hover:border-pink-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="shippingOption"
                      value={key}
                      checked={shippingOption === key}
                      onChange={(e) => setShippingOption(e.target.value)}
                      className="accent-pink-600 w-5 h-5"
                    />
                    <div className="flex items-center gap-3 text-pink-700 text-lg font-semibold">
                      <span>{key === "standard" ? "🚚" : "🚀"}</span>
                      <span className="capitalize">
                        {key} Delivery (${value})
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Order Summary */}
          <div className="h-220 bg-white p-8 rounded-3xl shadow-2xl border-3 border-pink-200 space-y-6">
            <h2 className="text-2xl font-extrabold text-pink-700 border-b border-pink-200 pb-2">
              Order Summary
            </h2>

            <div className="h-92 overflow-y-auto bg-pink-50 p-5 rounded-xl border border-pink-300 space-y-5">
              {cart.length === 0 && (
                <p className="text-center text-pink-400 italic">Your cart is empty</p>
              )}
              {cart.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex justify-between items-start gap-6 border-b border-pink-200 pb-4 last:border-b-0"
                >
                  <div className="flex gap-4 items-start">
                    <img
                      src={item.image || "https://via.placeholder.com/50"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg shadow"
                    />
                    <div className="text-sm">
                      <div className="font-semibold text-pink-700">{item.name}</div>
                      {item.selectedColor && (
                        <div className="text-pink-500 text-xs">Color: {item.selectedColor.name}</div>
                      )}
                      {item.selectedSize && (
                        <div className="text-pink-500 text-xs">Size: {item.selectedSize}</div>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => updateQuantity(item, item.quantity - 1)}
                          className="px-2 py-1 bg-pink-200 text-pink-700 rounded font-bold hover:bg-pink-300"
                        >
                          −
                        </button>
                        <span className="text-pink-700 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item, item.quantity + 1)}
                          className="px-2 py-1 bg-pink-200 text-pink-700 rounded font-bold hover:bg-pink-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <div className="font-bold text-pink-700">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      onClick={() => removeFromCart(item)}
                      aria-label={`Remove ${item.name}`}
                      className="text-pink-600 hover:text-pink-800 transition"
                    >
                      <FaTrashAlt size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Voucher Input */}
            <div className="bg-pink-100 border border-pink-300 rounded-xl p-3 space-y-2">
              <h3 className="text-lg font-bold text-pink-700">Have a Voucher?</h3>
              {!voucherApplied ? (
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    className="flex-grow p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 transition"
                  />
                  <button
                    onClick={handleApplyVoucher}
                    disabled={!voucherCode.trim()}
                    className={`px-5 py-3 text-white font-semibold rounded-lg transition ${
                      voucherCode.trim()
                        ? "bg-pink-600 hover:bg-pink-700"
                        : "bg-pink-300 cursor-not-allowed"
                    }`}
                  >
                    Apply
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-pink-300 shadow-sm">
                  <span className="text-green-700 font-semibold">
                    Voucher "{VOUCHER_CODE}" applied!
                  </span>
                  <button
                    onClick={handleRemoveVoucher}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Totals */}
            <div className="space-y-1 border-t border-pink-200 pt-3">
              <div className="flex justify-between text-lg font-medium text-pink-700">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-medium text-pink-700">
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              {voucherApplied && (
                <div className="flex justify-between text-lg font-medium text-green-700">
                  <span>Discount</span>
                  <span>- ${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between border-t text-2xl font-bold text-pink-700 pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <div className="text-center">
              <button
                onClick={handlePlaceOrder}
                disabled={cart.length === 0}
                className={`px-3 py-2 text-lg font-bold text-white rounded-xl transition ${
                  cart.length === 0
                    ? "bg-pink-300 cursor-not-allowed"
                    : "bg-pink-600 hover:bg-pink-700"
                }`}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
