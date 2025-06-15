
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Wishlist = () => {
  const { wishlistItems, allBooks, addToCart, toggleWishlist } = useAppContext();
  const { toast } = useToast();
  
  const wishlistBooks = allBooks.filter(book => wishlistItems.includes(book.id));

  const handleAddToCart = (book: any) => {
    addToCart(book);
    toast({
      title: "Added to cart!",
      description: `${book.title} has been added to your cart.`,
    });
  };

  const handleRemoveFromWishlist = (bookId: number, title: string) => {
    toggleWishlist(bookId);
    toast({
      title: "Removed from wishlist",
      description: `${title} has been removed from your wishlist.`,
    });
  };

  if (wishlistBooks.length === 0) {
    return (
      <div className="min-h-screen bg-bookworld-bg font-inter">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <Heart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h1 className="font-playfair text-3xl font-bold text-bookworld-primary mb-4">
              Your Wishlist is Empty
            </h1>
            <p className="text-gray-600 mb-8">
              Save books you love to your wishlist and never lose track of them.
            </p>
            <Link to="/">
              <Button className="bg-bookworld-accent hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full">
                Discover Books
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bookworld-bg font-inter">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-bookworld-primary mb-8">
          My Wishlist ({wishlistBooks.length} books)
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistBooks.map((book) => {
            const discount = Math.round(((book.mrp - book.price) / book.mrp) * 100);
            
            return (
              <div key={book.id} className="bg-white rounded-xl p-4 shadow-sm border group hover:shadow-md transition-all duration-300">
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
                    onClick={() => handleRemoveFromWishlist(book.id, book.title)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </button>
                  
                  {discount > 0 && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
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
                  <p className="text-sm text-gray-600">by {book.author}</p>
                  
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

                  <Button 
                    onClick={() => handleAddToCart(book)}
                    className="w-full bg-bookworld-accent hover:bg-orange-600 text-white font-semibold rounded-full flex items-center gap-2 mt-3"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
