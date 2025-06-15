
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';

const categories = [
  { name: 'Fiction', icon: '📚', color: 'bg-blue-50 hover:bg-blue-100', id: 'fiction', count: '2.5k+' },
  { name: 'Non-Fiction', icon: '🧠', color: 'bg-green-50 hover:bg-green-100', id: 'non-fiction', count: '1.8k+' },
  { name: 'Children', icon: '🧸', color: 'bg-yellow-50 hover:bg-yellow-100', id: 'children', count: '950+' },
  { name: 'Biography', icon: '👤', color: 'bg-purple-50 hover:bg-purple-100', id: 'biography', count: '420+' },
  { name: 'Science', icon: '🔬', color: 'bg-cyan-50 hover:bg-cyan-100', id: 'science', count: '680+' },
  { name: 'History', icon: '🏛️', color: 'bg-orange-50 hover:bg-orange-100', id: 'history', count: '540+' },
  { name: 'Romance', icon: '💕', color: 'bg-pink-50 hover:bg-pink-100', id: 'romance', count: '1.2k+' },
  { name: 'Mystery', icon: '🕵️', color: 'bg-gray-50 hover:bg-gray-100', id: 'mystery', count: '780+' }
];

const CategorySection = () => {
  const { setActiveFilter } = useAppContext();

  const handleCategoryClick = (categoryId: string) => {
    setActiveFilter(categoryId);
    // Scroll to the books section
    setTimeout(() => {
      const booksSection = document.getElementById('books-section');
      if (booksSection) {
        booksSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-bookworld-primary mb-4">
            Browse by Genre
          </h2>
          <p className="font-inter text-gray-600 text-lg max-w-2xl mx-auto">
            Discover your next favorite book across our carefully curated categories with thousands of titles
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className={`${category.color} p-6 rounded-xl text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-book group animate-fade-in border border-transparent hover:border-bookworld-accent/20`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
              <h3 className="font-inter font-semibold text-bookworld-primary mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500 font-medium">
                {category.count} books
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            className="border-bookworld-accent text-bookworld-accent hover:bg-bookworld-accent hover:text-white px-8 py-3 rounded-full font-semibold"
            onClick={() => setActiveFilter(null)}
          >
            View All Categories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
