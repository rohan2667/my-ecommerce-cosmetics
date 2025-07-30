import React from 'react';
import BannerSlider from '../components/BannerSlider';
import NewArrivals from '../components/NewArrivals';
import DealsOfTheDay from '../components/DealsOfTheDay';
import BestSellers from '../components/BestSellers';
import BrandListing from '../components/BrandListing';
import Layout from '../layouts/Layout';
import Promo from '../components/promo';
import Testimonials from '../components/Testimonials';

const Homepage = () => {
  return (
    <Layout>
      <BannerSlider />
      <BestSellers />
      <DealsOfTheDay />
      <Promo />
      <NewArrivals />
      
      <Testimonials />
      <BrandListing />
    </Layout>
  );
};

export default Homepage;
