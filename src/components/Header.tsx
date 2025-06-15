
import React, { useState } from 'react';
import { Search, Heart, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount] = useState(3);
  const [wishlistCount] = useState(5);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 h-20 flex items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2 font-playfair font-bold text-xl text-bookworld-primary">
          <Book className="h-6 w-6 text-bookworld-accent" />
          <span>Bookworld India</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search books by title, author, ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-full border-gray-200 focus:border-bookworld-accent focus:ring-bookworld-accent"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <select className="text-sm border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-bookworld-accent">
            <option value="en">EN</option>
            <option value="hi">HI</option>
          </select>

          {/* Currency Selector */}
          <select className="text-sm border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-bookworld-accent">
            <option value="inr">INR</option>
            <option value="usd">USD</option>
          </select>

          {/* Login/Signup */}
          <Button variant="ghost" className="text-bookworld-primary hover:text-bookworld-accent">
            Login
          </Button>

          {/* Wishlist */}
          <Button variant="ghost" className="relative text-bookworld-primary hover:text-bookworld-accent">
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-bookworld-accent">
                {wishlistCount}
              </Badge>
            )}
          </Button>

          {/* Cart */}
          <Button variant="ghost" className="relative text-bookworld-primary hover:text-bookworld-accent">
            🛒
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-bookworld-accent">
                {cartCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
