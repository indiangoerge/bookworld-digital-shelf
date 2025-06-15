
import React from 'react';
import BookCard from './BookCard';
import { useAppContext } from '@/contexts/AppContext';

const BookGrid = () => {
  const { filteredBooks, searchQuery, activeFilter } = useAppContext();

  const getTitle = () => {
    if (searchQuery) {
      return `Search Results for "${searchQuery}"`;
    }
    if (activeFilter) {
      const filterLabels: { [key: string]: string } = {
        fiction: 'Fiction Books',
        'non-fiction': 'Non-Fiction Books',
        children: 'Children\'s Books',
        biography: 'Biography Books',
        mystery: 'Mystery Books',
        new: 'New Arrivals',
        bestseller: 'Bestsellers',
        discount: 'Books with 40%+ Discount'
      };
      return filterLabels[activeFilter] || 'Filtered Books';
    }
    return 'All Books';
  };

  return (
    <section id="books-section" className="py-16 bg-bookworld-bg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-bookworld-primary mb-2">
              {getTitle()}
            </h2>
            <p className="font-inter text-gray-600">
              {filteredBooks.length} books found
            </p>
          </div>
        </div>

        {filteredBooks.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="font-playfair text-2xl font-bold text-bookworld-primary mb-2">
              No books found
            </h3>
            <p className="font-inter text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book, index) => (
              <div 
                key={book.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <BookCard book={book} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BookGrid;
