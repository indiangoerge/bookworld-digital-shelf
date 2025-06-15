
import React, { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

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
  const { addToCart, toggleWishlist, isInWishlist } = useAppContext();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const isWishlisted = isInWishlist(book.id);
  const discount = Math.round(((book.mrp - book.price) / book.mrp) * 100);

  const handleAddToCart = () => {
    addToCart(book);
    toast({
      title: "Added to cart!",
      description: `${book.title} has been added to your cart.`,
    });
  };

  const handleWishlistToggle = () => {
    toggleWishlist(book.id);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist!",
      description: `${book.title} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  return (
    <div 
      className="bg-bookworld-card rounded-xl p-4 shadow-book hover:shadow-book-hover transition-all duration-300 hover:scale-105 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-4">
        <Link to={`/book/${book.id}`}>
          <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
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
        {discount > 0 && !book.badge && (
          <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs">
            {discount}% OFF
          </Badge>
        )}
      </div>

      <div className="space-y-2">
        <Link to={`/book/${book.id}`}>
          <h3 className="font-inter font-semibold text-bookworld-primary line-clamp-2 group-hover:text-bookworld-accent transition-colors duration-300">
            {book.title}
          </h3>
        </Link>
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
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-bookworld-accent hover:bg-orange-600 text-white font-semibold rounded-full flex items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
