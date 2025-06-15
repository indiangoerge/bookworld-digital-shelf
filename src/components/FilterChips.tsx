
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/contexts/AppContext';

const filterOptions = [
  { id: 'new', label: 'New Arrivals', count: 24 },
  { id: 'discount', label: 'Discount 40%+', count: 156 },
  { id: 'fiction', label: 'Fiction', count: 456 },
  { id: 'children', label: 'Children', count: 234 },
  { id: 'non-fiction', label: 'Non-Fiction', count: 89 },
  { id: 'bestseller', label: 'Bestsellers', count: 67 },
  { id: 'biography', label: 'Biography', count: 45 },
  { id: 'mystery', label: 'Mystery', count: 23 }
];

const FilterChips = () => {
  const { activeFilter, setActiveFilter } = useAppContext();

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
