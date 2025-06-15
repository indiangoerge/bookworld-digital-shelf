
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import Header from '@/components/Header';
import BookGrid from '@/components/BookGrid';
import Footer from '@/components/Footer';
import CategorySection from '@/components/CategorySection';

const Categories = () => {
  const { category } = useParams();
  const { setActiveFilter } = useAppContext();

  // Set the active filter when component mounts or category changes
  React.useEffect(() => {
    if (category) {
      setActiveFilter(category);
    } else {
      setActiveFilter(null);
    }
  }, [category, setActiveFilter]);

  return (
    <div className="min-h-screen bg-bookworld-bg font-inter">
      <Header />
      {!category && <CategorySection />}
      <BookGrid />
      <Footer />
    </div>
  );
};

export default Categories;
