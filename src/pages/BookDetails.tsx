
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, Star, ZoomIn, Eye, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';

const BookDetails = () => {
  const { id } = useParams();
  const { allBooks, addToCart, toggleWishlist, isInWishlist } = useAppContext();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  
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
  
  // Sample gallery images for "Look Inside"
  const galleryImages = [
    book.cover,
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop"
  ];

  // Related books from same category
  const relatedBooks = allBooks
    .filter(b => b.category === book.category && b.id !== book.id)
    .slice(0, 4);

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
        
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Book Images */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={galleryImages[selectedImage]}
                alt={book.title}
                className={`w-full h-full object-cover transition-transform duration-300 cursor-pointer ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
            </div>
            
            {/* Image thumbnails */}
            <div className="flex gap-2">
              {galleryImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-24 rounded overflow-hidden border-2 ${
                    selectedImage === index ? 'border-bookworld-accent' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Look Inside Button */}
            <Button variant="outline" className="w-full flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Look Inside
            </Button>
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
              <Link 
                to={`/author/${book.author.replace(' ', '-').toLowerCase()}`}
                className="text-xl text-bookworld-accent hover:underline mb-4 block"
              >
                by {book.author}
              </Link>
              
              <div className="flex items-center gap-4 mb-4">
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

              {/* Quick Info */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4 text-green-600" />
                  <span>Free delivery on orders above ₹500</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <RotateCcw className="h-4 w-4 text-blue-600" />
                  <span>7-day easy return policy</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-purple-600" />
                  <span>100% authentic books</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="delivery">Delivery Info</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="space-y-4">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">About this book</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                This captivating book takes readers on an unforgettable journey through compelling characters and masterful storytelling. 
                A must-read for anyone who appreciates quality literature and engaging narratives that stay with you long after the final page.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The author weaves together themes of love, loss, and redemption in a way that feels both timeless and urgently contemporary. 
                With rich prose and unforgettable characters, this book will appeal to readers of all backgrounds and interests.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="space-y-4">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Customer Reviews</h3>
              <div className="space-y-4">
                {[
                  { name: "Priya S.", rating: 5, comment: "Absolutely loved this book! Couldn't put it down." },
                  { name: "Raj M.", rating: 4, comment: "Great story, well-written characters. Highly recommend!" },
                  { name: "Anita K.", rating: 5, comment: "One of the best books I've read this year." }
                ].map((review, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">{review.name}</span>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="delivery" className="space-y-4">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Delivery Information</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">Standard Delivery</h4>
                  <p className="text-gray-600 text-sm">3-5 business days | Free on orders above ₹500</p>
                </div>
                <div>
                  <h4 className="font-medium">Express Delivery</h4>
                  <p className="text-gray-600 text-sm">1-2 business days | ₹99 additional charge</p>
                </div>
                <div>
                  <h4 className="font-medium">Same Day Delivery</h4>
                  <p className="text-gray-600 text-sm">Available in select cities | ₹199 additional charge</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="space-y-4">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Book Specifications</h3>
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
                  <span className="font-medium">Pages:</span>
                  <span className="ml-2 text-gray-600">{book.pages || '320'}</span>
                </div>
                <div>
                  <span className="font-medium">Published:</span>
                  <span className="ml-2 text-gray-600">{book.publishedYear || '2023'}</span>
                </div>
                <div>
                  <span className="font-medium">Category:</span>
                  <span className="ml-2 text-gray-600 capitalize">{book.category || 'Fiction'}</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <div>
            <h2 className="font-playfair text-2xl font-bold text-bookworld-primary mb-6">
              Related Books
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedBooks.map((relatedBook) => (
                <BookCard key={relatedBook.id} book={relatedBook} />
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default BookDetails;
