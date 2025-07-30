import React, { useState } from "react";
import {
  FaBox,
  FaHeart,
  FaUndo,
  FaMapMarkerAlt,
  FaStar,
  FaUser,
  FaTimesCircle,
} from "react-icons/fa";
import Layout from "../layouts/Layout";
import { useWishlist } from "../contexts/WishlistContext";
import ProductCard from "../components/ProductCard";
import AddressBook from "../components/AddressBook";
import AccountDetails from "../components/AccountDetails";

// Mock Data for demonstration
const mockOrders = [
  {
    id: "O1001",
    date: "2025-07-23",
    status: "Shipped",
    total: 149.99,
    items: [
      {
        id: "p1",
        name: "Matte Lipstick",
        quantity: 1,
        image: "/images/Creamy-Matte-Lipstick-Obsession-Lid-Off.webp",
        price: 19.99,
      },
      {
        id: "p2",
        name: "Mascara",
        quantity: 1,
        image: "/images/Full-Size-Mascara-Open-SKU.jpg",
        price: 21.0,
      },
    ],
  },
  {
    id: "O1002",
    date: "2025-07-20",
    status: "Processing",
    total: 59.99,
    items: [
      {
        id: "p3",
        name: "Lip gloss",
        quantity: 1,
        image: "/images/Lip-Souffle-COURAGE-SKU.jpg",
        price: 19.99,
      },
    ],
  },
];

const mockReviews = [
  {
    id: "R2001",
    product: {
      id: "p1",
      name: "Matte Lipstick",
      image: "/images/Creamy-Matte-Lipstick-Super-Nude-Lid-Off.webp",
    },
    rating: 4,
    date: "2025-07-18",
    content: "Very comfortable sneakers, love the fit and style.",
  },
  {
    id: "R2002",
    product: {
      id: "p3",
      name: "Bronzer Stick",
      image: "/images/Bronzer-Stick-Power-Boost-SKU.jpg",
    },
    rating: 5,
    date: "2025-07-15",
    content: "Perfect jeans! Good quality and great fit.",
  },
];

  const mockReturns = [
    {
      id: "RT1001",
      date: "2025-07-22",
      status: "Pending",
      items: [
        {
          id: "p1",
          name: "Brown Lipstick",
          quantity: 1,
          image: "/images/cosmetic-beauty-product-01-a.jpg",
          price: 40.99,
        },
      ],
    },
    {
      id: "RT1002",
      date: "2025-07-18",
      status: "Processed",
      items: [
        {
          id: "p3",
          name: "Lip Gloss",
          quantity: 1,
          image: "/images/Lip-Souffle-COURAGE-SKU.jpg",
          price: 59.99,
        },
      ],
    },
  ];

const sections = [
  { id: "orders", label: "My Orders", icon: <FaBox /> },
  { id: "wishlist", label: "Wishlist", icon: <FaHeart /> },
  { id: "returns", label: "Returns", icon: <FaUndo /> },
  { id: "address", label: "Address Book", icon: <FaMapMarkerAlt /> },
  { id: "reviews", label: "Reviews", icon: <FaStar /> },
  { id: "account", label: "Account Details", icon: <FaUser /> },
];

const AccountPage = () => {
  const [activeSection, setActiveSection] = useState("orders");
  const { wishlist } = useWishlist();

  // Local state to manage mutable data
  const [ordersData, setOrdersData] = useState(mockOrders);
  const [returnsData, setReturnsData] = useState(mockReturns);
  const [reviewsData, setReviewsData] = useState(mockReviews);

  // Cancel order handler
  const handleCancelOrder = (orderId) => {
    if (
      window.confirm(
        "Are you sure you want to cancel this order? This action cannot be undone."
      )
    ) {
      // Simulate removal - replace with API call
      setOrdersData((prev) => prev.filter((order) => order.id !== orderId));
    }
  };

  // Cancel return handler
  const handleCancelReturn = (returnId) => {
    if (
      window.confirm(
        "Are you sure you want to cancel this return request? This action cannot be undone."
      )
    ) {
      setReturnsData((prev) => prev.filter((ret) => ret.id !== returnId));
    }
  };

  // Delete review handler
  const handleDeleteReview = (reviewId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this review? This action cannot be undone."
      )
    ) {
      setReviewsData((prev) => prev.filter((rev) => rev.id !== reviewId));
    }
  };

  const EmptyState = ({ message, icon }) => (
    <div className="text-center py-16 text-gray-600">
      <p className="mb-6 text-xl font-semibold">{message}</p>
      <img
        src={`https://cdn-icons-png.flaticon.com/512/${icon}/${icon}.png`}
        alt="Empty"
        className="mx-auto w-12 opacity-60"
      />
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case "orders":
        if (ordersData.length === 0)
          return <EmptyState message="You have no recent orders." icon="565491" />;

        return (
          <div className="max-h-[600px] overflow-y-auto space-y-6 py-4">
            {ordersData.map((order) => (
              <div
                key={order.id}
                className="border border-pink-300 rounded-lg p-5 shadow hover:shadow-lg transition bg-white relative group"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-lg">Order #{order.id}</h4>
                  <span className="text-sm text-gray-600">{order.date}</span>
                </div>
                <div className="mb-2 text-sm">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      order.status === "Shipped"
                        ? "text-green-600"
                        : order.status === "Processing"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm mb-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 border border-pink-200 rounded p-2"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded"
                      />
                      <div className="truncate">
                        <p className="font-medium truncate">{item.name}</p>
                        <p>Qty: {item.quantity}</p>
                        <p>${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="font-bold text-lg mb-3">Total: ${order.total.toFixed(2)}</div>
                {/* Cancel Order button only if order is Processing */}
                {order.status === "Processing" && (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="absolute right-5 top-11 text-sm text-pink-700 border border-pink-700 px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-pink-700 hover:text-white"
                    title="Cancel Order"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            ))}
          </div>
        );

      case "wishlist":
        if (wishlist.length === 0) {
          return (
            <div className="text-center py-16 text-gray-600">
              <p className="mb-6 text-xl font-semibold">Your wishlist is empty.</p>
              <img
                src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                alt="Empty wishlist"
                className="mx-auto w-12 opacity-60"
              />
            </div>
          );
        }

        return (
          <div className="max-h-[320px] overflow-x-auto scrollbar-hide py-2">
            <div className="inline-flex space-x-4">
              {wishlist.map((product) => (
                <ProductCard key={product.id} product={product} smallSquare />
              ))}
            </div>
          </div>
        );

      case "returns":
        if (returnsData.length === 0)
          return (
          <div className="text-center py-16 text-gray-600">
             <p className="mb-6 text-xl font-semibold">No return requests.</p>
             <img
             src="https://cdn-icons-png.flaticon.com/512/748/748122.png"
               alt="No returns"
             className="mx-auto w-12 opacity-60"
            />
          </div>
       );


        return (
          <div className="max-h-[600px] overflow-y-auto space-y-4 py-4">
            {returnsData.map((ret) => (
              <div
                key={ret.id}
                className="border border-pink-300 rounded-lg p-4 shadow hover:shadow-lg transition bg-white relative group"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-lg">Return #{ret.id}</h4>
                  <span className="text-sm text-gray-600">{ret.date}</span>
                </div>
                <div className="mb-2 text-sm">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      ret.status === "Processed"
                        ? "text-green-600"
                        : ret.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {ret.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm mb-4">
                  {ret.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 border border-pink-200 rounded p-2"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded"
                      />
                      <div className="truncate">
                        <p className="font-medium truncate">{item.name}</p>
                        <p>Qty: {item.quantity}</p>
                        <p>${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Cancel Return button only for Pending returns */}
                {ret.status === "Pending" && (
                  <button
                    onClick={() => handleCancelReturn(ret.id)}
                    className="absolute right-5 top-9 text-sm text-pink-700 border border-pink-700 px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-pink-700 hover:text-white"
                    title="Cancel Return Request"
                  >
                    Cancel Return
                  </button>
                )}
              </div>
            ))}
          </div>
        );

      case "reviews":
        if (reviewsData.length === 0)
          return (
            <div className="text-center py-16 text-gray-600">
              <p className="mb-6 text-xl font-semibold">
                You haven't posted any reviews yet.
              </p>
              <img
                src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
                alt="No reviews"
                className="mx-auto w-12 opacity-60"
              />
            </div>
          );

        return (
          <div className="max-h-[600px] overflow-y-auto space-y-4 py-4">
            {reviewsData.map((review) => (
              <div
                key={review.id}
                className="border border-pink-300 rounded-lg p-4 shadow hover:shadow-lg transition bg-white relative group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={review.product.image}
                    alt={review.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h5 className="font-semibold">{review.product.name}</h5>
                    <div className="flex items-center text-yellow-500 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`${
                            i < review.rating ? "fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">{review.date}</p>
                  </div>
                </div>
                <p className="text-gray-800 mb-3">{review.content}</p>

                {/* Delete Review button */}
                <button
                  onClick={() => handleDeleteReview(review.id)}
                  className="absolute right-5 top-6 text-sm text-pink-700 border border-pink-700 px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-pink-700 hover:text-white"
                  title="Delete Review"
                >
                  Delete Review
                </button>
              </div>
            ))}
          </div>
        );

      case "address":
        return <AddressBook />;

      case "account":
        return <AccountDetails />;

      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="relative w-full h-[250px] mb-10 shadow-lg overflow-hidden">
        <img
          src="/images/breadcamp_bg_7.jpeg"
          alt="Cart Banner"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-start mt-20 ml-12">
          <h1 className="text-7xl font-bold tracking-widest font-display text-white drop-shadow-lg px-4 py-2 rounded">
            My Account
          </h1>
        </div>
      </div>
      <div className="md:grid md:grid-cols-4 md:gap-6 p-6 bg-gray-50 min-h-screen">
        {/* Sidebar */}
        <aside className="md:col-span-1 bg-white rounded-2xl shadow-xl p-6">
          <nav className="space-y-4">
            {sections.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg font-semibold transition ${
                  activeSection === id
                    ? "border border-pink-700 text-pink-700 shadow-md"
                    : "text-gray-600 hover:bg-pink-50"
                }`}
              >
                <span className="text-lg">{icon}</span> {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="md:col-span-3 bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-2xl font-bold text-pink-600 mb-4 capitalize">
            {sections.find((s) => s.id === activeSection)?.label}
          </h3>
          {renderSectionContent()}
        </main>
      </div>
    </Layout>
  );
};

export default AccountPage;
