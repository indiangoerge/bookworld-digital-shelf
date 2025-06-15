
import React from 'react';
import BookCard from './BookCard';

const trendingBooks = [
  {
    id: 1,
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    price: 299,
    mrp: 399,
    rating: 4.8,
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    badge: "Bestseller"
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: 450,
    mrp: 599,
    rating: 4.9,
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop",
    badge: "Popular"
  },
  {
    id: 3,
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 350,
    mrp: 450,
    rating: 4.6,
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
    badge: "New Arrival"
  },
  {
    id: 4,
    title: "Educated",
    author: "Tara Westover",
    price: 399,
    mrp: 499,
    rating: 4.7,
    cover: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=300&h=400&fit=crop"
  },
  {
    id: 5,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 275,
    mrp: 350,
    rating: 4.5,
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    badge: "Trending"
  }
];

const TrendingSection = () => {
  return (
    <section className="py-16 bg-bookworld-bg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-bookworld-primary mb-2">
              Trending Now
            </h2>
            <p className="font-inter text-gray-600">Books readers can't put down</p>
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
      </div>
    </section>
  );
};

export default TrendingSection;
