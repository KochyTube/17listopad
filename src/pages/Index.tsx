
import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Program from "@/components/Program"
import Footer from "@/components/Footer";
import AboutUs from "@/components/AboutUs";
import GallerySection from "@/components/GallerySection";
import WhySection from "@/components/WhySection";

const Index = () => {
  return (
    <div className="min-h-screen bg-dark overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <WhySection/>
      <Program />
      <GallerySection />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default Index;
