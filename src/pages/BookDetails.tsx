
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const BookDetails = () => {
  const { id } = useParams();
  const { allBooks, addToCart, toggleWishlist, isInWishlist } = useAppContext();
  const { toast } = useToast();
  
  const book = allBooks.find(b => b.id === parseInt(id || ''));
  
  if (!book) {
    return (
      <div className="min-h-screen bg-bookworld-bg font-inter">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Book not found</h1>
          <Link to="/" className="text-bookworld-accent hover:underline">
            Return to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

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
    <div className="min-h-screen bg-bookworld-bg font-inter">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-bookworld-accent hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Books
        </Link>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Book Image */}
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Book Details */}
          <div className="space-y-6">
            <div>
              {book.badge && (
                <Badge className="mb-2 bg-bookworld-accent text-white">
                  {book.badge}
                </Badge>
              )}
              <h1 className="font-playfair text-3xl md:text-4xl font-bold text-bookworld-primary mb-2">
                {book.title}
              </h1>
              <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="font-medium">{book.rating}</span>
                <span className="text-gray-500">(234 reviews)</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-bookworld-primary">₹{book.price}</span>
                {book.mrp > book.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">₹{book.mrp}</span>
                    <Badge className="bg-green-500 text-white">{discount}% OFF</Badge>
                  </>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={handleAddToCart}
                  className="bg-bookworld-accent hover:bg-orange-600 text-white font-semibold rounded-full flex items-center gap-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={handleWishlistToggle}
                  className={`rounded-full flex items-center gap-2 ${
                    isWishlisted ? 'bg-red-50 border-red-200 text-red-600' : ''
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                </Button>
              </div>
            </div>
            
            <div className="space-y-4 pt-6 border-t">
              <h3 className="font-semibold text-lg">Book Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Publisher:</span>
                  <span className="ml-2 text-gray-600">{book.publisher || 'Penguin Random House'}</span>
                </div>
                <div>
                  <span className="font-medium">Language:</span>
                  <span className="ml-2 text-gray-600">{book.language || 'English'}</span>
                </div>
                <div>
                  <span className="font-medium">ISBN:</span>
                  <span className="ml-2 text-gray-600">{book.isbn || '978-0-123456-78-9'}</span>
                </div>
                <div>
                  <span className="font-medium">Category:</span>
                  <span className="ml-2 text-gray-600 capitalize">{book.category || 'Fiction'}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 pt-6 border-t">
              <h3 className="font-semibold text-lg">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                This captivating book takes readers on an unforgettable journey through compelling characters and masterful storytelling. 
                A must-read for anyone who appreciates quality literature and engaging narratives that stay with you long after the final page.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookDetails;
