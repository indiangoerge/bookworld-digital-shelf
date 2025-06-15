
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/contexts/AppContext';

const FilterChips = () => {
  const { activeFilter, setActiveFilter, allBooks } = useAppContext();

  // Calculate real counts from the book data
  const filterOptions = [
    { 
      id: 'new', 
      label: 'New Arrivals', 
      count: allBooks.filter(book => book.badge === 'New Arrival').length 
    },
    { 
      id: 'discount', 
      label: 'Discount 40%+', 
      count: allBooks.filter(book => ((book.mrp - book.price) / book.mrp) >= 0.4).length 
    },
    { 
      id: 'fiction', 
      label: 'Fiction', 
      count: allBooks.filter(book => book.category === 'fiction').length 
    },
    { 
      id: 'children', 
      label: 'Children', 
      count: allBooks.filter(book => book.category === 'children').length 
    },
    { 
      id: 'non-fiction', 
      label: 'Non-Fiction', 
      count: allBooks.filter(book => book.category === 'non-fiction').length 
    },
    { 
      id: 'bestseller', 
      label: 'Bestsellers', 
      count: allBooks.filter(book => book.badge === 'Bestseller').length 
    },
    { 
      id: 'biography', 
      label: 'Biography', 
      count: allBooks.filter(book => book.category === 'biography').length 
    },
    { 
      id: 'mystery', 
      label: 'Mystery', 
      count: allBooks.filter(book => book.category === 'mystery').length 
    },
    { 
      id: 'science', 
      label: 'Science', 
      count: allBooks.filter(book => book.category === 'science').length 
    },
    { 
      id: 'romance', 
      label: 'Romance', 
      count: allBooks.filter(book => book.category === 'romance').length 
    }
  ];

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(activeFilter === filterId ? null : filterId);
  };

  return (
    <section className="py-8 bg-white border-b">
      <div className="container mx-auto px-4">
        <h3 className="font-inter font-semibold text-bookworld-primary mb-4">
          Quick Filters
        </h3>
        <div className="overflow-x-auto">
          <div className="flex gap-3 min-w-max pb-2">
            {filterOptions.map((filter) => (
              <Badge
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  activeFilter === filter.id
                    ? 'bg-bookworld-accent hover:bg-orange-600 text-white'
                    : 'border-bookworld-accent text-bookworld-accent hover:bg-bookworld-accent hover:text-white'
                }`}
                onClick={() => handleFilterClick(filter.id)}
              >
                #{filter.label} ({filter.count})
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterChips;
