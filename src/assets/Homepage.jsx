import React from 'react';
import BannerSlider from '../components/BannerSlider';
import NewArrivals from '../components/NewArrivals';
import DealsOfTheDay from '../components/DealsOfTheDay';
import BestSellers from '../components/BestSellers';
import BrandListing from '../components/BrandListing';
import Layout from '../components/Layout';

const Homepage = () => {
  return (
    <Layout>
      <BannerSlider />
      <BestSellers />
      <DealsOfTheDay />
      <NewArrivals />
      <BrandListing />
    </Layout>
  );
};

export default Homepage;
