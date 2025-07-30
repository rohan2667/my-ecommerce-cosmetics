import React from "react";
import { BsFire } from "react-icons/bs";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <>
      {/* Fixed Discount Banner */}
      <a
        href="/sales-offers"
        className="fixed top-0 w-full bg-[#f67b94] font-light font-secondary text-white text-center py-2 z-60 hover:bg-pink-500 transition-colors"
      >
        <strong className="flex justify-center items-center gap-1"> <BsFire /> 50% OFF — Limited Time Only! Click Here <BsFire /> </strong>
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