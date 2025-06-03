// src/components/Navbar.jsx
import React from "react";
import CategoryMenu from "../components/CategoryMenu";
import TopBar from "../components/TopBar"; 

const Navbar = () => {
  return (
    <div className="w-full bg-white shadow-md z-50">
      <TopBar />      
      <CategoryMenu /> 
    </div>
  );
};

export default Navbar;
