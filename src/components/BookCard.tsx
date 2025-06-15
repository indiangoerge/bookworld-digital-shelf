
import React, { useState } from 'react';
import { Heart, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BookCardProps {
  book: {
    id: number;
    title: string;
    author: string;
    price: number;
    mrp: number;
    rating: number;
    cover: string;
    badge?: string;
  };
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const discount = Math.round(((book.mrp - book.price) / book.mrp) * 100);

  return (
    <div 
      className="bg-bookworld-card rounded-xl p-4 shadow-book hover:shadow-book-hover transition-all duration-300 hover:scale-105 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-4">
        <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`absolute top-2 right-2 p-1.5 rounded-full transition-all duration-300 ${
            isWishlisted ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'
          } hover:scale-110`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Badge */}
        {book.badge && (
          <Badge className="absolute top-2 left-2 bg-bookworld-accent text-white text-xs">
            {book.badge}
          </Badge>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs">
            {discount}% OFF
          </Badge>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-inter font-semibold text-bookworld-primary line-clamp-2 group-hover:text-bookworld-accent transition-colors duration-300">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 font-inter">by {book.author}</p>
        
        <div className="flex items-center gap-1 text-sm">
          <span className="text-yellow-400">⭐</span>
          <span className="font-medium">{book.rating}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-bookworld-primary">₹{book.price}</span>
          {book.mrp > book.price && (
            <span className="text-sm text-gray-500 line-through">₹{book.mrp}</span>
          )}
        </div>

        <div className={`transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <Button className="w-full bg-bookworld-accent hover:bg-orange-600 text-white font-semibold rounded-full">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
