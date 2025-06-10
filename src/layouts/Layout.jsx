import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <>
      {/* Fixed Discount Banner */}
      <a
        href="/sale"
        className="fixed top-0 w-full bg-pink-300 text-black text-center py-2 z-50 hover:bg-pink-600 transition-colors"
      >
        <strong>🔥 50% OFF — Limited Time Only! Click Here 🔥</strong>
      </a>


      <div className="pt-12">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;