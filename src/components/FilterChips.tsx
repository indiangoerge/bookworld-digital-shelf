
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';

const filterOptions = [
  { id: 'new', label: 'New Arrivals', count: 24 },
  { id: 'discount', label: 'Discount 40%+', count: 156 },
  { id: 'hindi', label: 'Hindi', count: 89 },
  { id: 'children', label: 'Children', count: 234 },
  { id: 'recent', label: 'Recently Added', count: 45 },
  { id: 'bestseller', label: 'Bestsellers', count: 67 },
  { id: 'preorder', label: 'Pre-orders', count: 23 },
  { id: 'fiction', label: 'Fiction', count: 456 }
];

const FilterChips = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

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
                onClick={() => setActiveFilter(activeFilter === filter.id ? null : filter.id)}
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
