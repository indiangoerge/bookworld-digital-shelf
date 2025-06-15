
import React from 'react';
import BookCard from './BookCard';
import { useAppContext } from '@/contexts/AppContext';

const TrendingSection = () => {
  const { allBooks } = useAppContext();
  
  // Get trending books (highest rated and popular books)
  const trendingBooks = allBooks
    .filter(book => book.rating >= 4.5 || book.badge === 'Bestseller' || book.badge === 'Trending')
    .slice(0, 8);

  return (
    <section className="py-16 bg-bookworld-bg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-bookworld-primary mb-2">
              Trending Now
            </h2>
            <p className="font-inter text-gray-600">Books readers can't put down this month</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span>📈 Sales up 300% this week</span>
              <span>⭐ Average rating: 4.6+</span>
              <span>🔥 {trendingBooks.length} trending titles</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-max">
            {trendingBooks.map((book, index) => (
              <div 
                key={book.id} 
                className="w-64 flex-shrink-0 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-600 mb-4">
            Join <span className="font-semibold text-bookworld-accent">250,000+</span> readers who trust our recommendations
          </p>
          <div className="flex justify-center items-center gap-8 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Free shipping on orders ₹500+</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>7-day easy returns</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>24/7 customer support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
