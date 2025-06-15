
import React from 'react';
import NotificationBar from '@/components/NotificationBar';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import FilterChips from '@/components/FilterChips';
import TrendingSection from '@/components/TrendingSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BookGrid from '@/components/BookGrid';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-bookworld-bg font-inter">
      <NotificationBar />
      <Header />
      <HeroSection />
      <CategorySection />
      <FilterChips />
      <TrendingSection />
      <TestimonialsSection />
      <BookGrid />
      <Footer />
    </div>
  );
};

export default Index;
