
import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Program from "@/components/Program"
import Footer from "@/components/Footer";
import AboutUs from "@/components/AboutUs";
import GallerySection from "@/components/GallerySection";

const Index = () => {
  return (
    <div className="min-h-screen bg-dark overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <Program />
      <AboutUs />
      <GallerySection />
      <Footer />
    </div>
  );
};

export default Index;
