
import React, { useState } from 'react';
import { Search, Heart, Book, User, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    getCartCount, 
    wishlistItems, 
    isLoggedIn, 
    setIsLoggedIn 
  } = useAppContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('inr');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      toast({
        title: "Searching...",
        description: `Looking for "${searchQuery}"`,
      });
    }
  };

  const handleLogin = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } else {
      setIsLoggedIn(true);
      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      });
    }
  };

  const cartCount = getCartCount();
  const wishlistCount = wishlistItems.length;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 h-20 flex items-center gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-playfair font-bold text-xl text-bookworld-primary">
          <Book className="h-6 w-6 text-bookworld-accent" />
          <span>Bookworld India</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search books by title, author, ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-full border-gray-200 focus:border-bookworld-accent focus:ring-bookworld-accent"
            />
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="text-sm border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-bookworld-accent"
          >
            <option value="en">EN</option>
            <option value="hi">HI</option>
          </select>

          {/* Currency Selector */}
          <select 
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="text-sm border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-bookworld-accent"
          >
            <option value="inr">INR</option>
            <option value="usd">USD</option>
          </select>

          {/* Login/Profile */}
          {isLoggedIn ? (
            <Link to="/profile">
              <Button variant="ghost" className="text-bookworld-primary hover:text-bookworld-accent flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </Button>
            </Link>
          ) : (
            <Button 
              variant="ghost" 
              className="text-bookworld-primary hover:text-bookworld-accent flex items-center gap-2"
              onClick={handleLogin}
            >
              <User className="h-4 w-4" />
              Login
            </Button>
          )}

          {/* Wishlist */}
          <Link to="/wishlist">
            <Button variant="ghost" className="relative text-bookworld-primary hover:text-bookworld-accent">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-bookworld-accent">
                  {wishlistCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Cart */}
          <Link to="/cart">
            <Button variant="ghost" className="relative text-bookworld-primary hover:text-bookworld-accent">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-bookworld-accent">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
