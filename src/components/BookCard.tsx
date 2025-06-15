
import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  mrp: number;
  rating: number;
  cover: string;
  badge?: string;
  category?: string;
  publisher?: string;
}

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const { addToCart, toggleWishlist, isInWishlist } = useAppContext();
  const { toast } = useToast();
  const isWishlisted = isInWishlist(book.id);
  const discount = Math.round(((book.mrp - book.price) / book.mrp) * 100);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book);
    toast({
      title: "Added to cart!",
      description: `${book.title} has been added to your cart.`,
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(book.id);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist!",
      description: `${book.title} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border group hover:shadow-md transition-all duration-300">
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
        
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2 right-2 p-1.5 rounded-full transition-colors ${
            isWishlisted 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
        
        {book.badge && (
          <Badge className="absolute top-2 left-2 bg-bookworld-accent text-white text-xs">
            {book.badge}
          </Badge>
        )}
        
        {discount > 0 && (
          <div className="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Link to={`/book/${book.id}`}>
          <h3 className="font-semibold text-bookworld-primary line-clamp-2 hover:text-bookworld-accent transition-colors">
            {book.title}
          </h3>
        </Link>
        
        <Link 
          to={`/author/${book.author.replace(' ', '-').toLowerCase()}`}
          className="text-sm text-gray-600 hover:text-bookworld-accent transition-colors"
        >
          by {book.author}
        </Link>
        
        <div className="flex items-center gap-1 text-sm">
          <Star className="h-3 w-3 text-yellow-400 fill-current" />
          <span className="font-medium">{book.rating}</span>
          <span className="text-gray-500">(234)</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-bookworld-primary">₹{book.price}</span>
          {book.mrp > book.price && (
            <span className="text-sm text-gray-500 line-through">₹{book.mrp}</span>
          )}
        </div>

        <Button 
          onClick={handleAddToCart}
          className="w-full bg-bookworld-accent hover:bg-orange-600 text-white font-semibold rounded-full flex items-center gap-2 mt-3"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default BookCard;
