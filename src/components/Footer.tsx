
import React from 'react';
import { Book, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-bookworld-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 font-playfair font-bold text-xl mb-4">
              <Book className="h-6 w-6 text-bookworld-accent" />
              <span>Bookworld India</span>
            </div>
            <p className="font-inter text-gray-300 mb-4">
              Your trusted partner for discovering amazing books. From bestsellers to hidden gems, we bring the world of literature to your doorstep.
            </p>
            <div className="flex items-center gap-1 text-sm text-gray-300">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400 fill-current" />
              <span>for book lovers</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-inter font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-bookworld-accent transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-bookworld-accent transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-bookworld-accent transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-bookworld-accent transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-bookworld-accent transition-colors">Affiliate Program</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-inter font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-bookworld-accent transition-colors">Fiction</a></li>
              <li><a href="#" className="hover:text-bookworld-accent transition-colors">Non-Fiction</a></li>
              <li><a href="#" className="hover:text-bookworld-accent transition-colors">Children's Books</a></li>
              <li><a href="#" className="hover:text-bookworld-accent transition-colors">Textbooks</a></li>
              <li><a href="#" className="hover:text-bookworld-accent transition-colors">New Arrivals</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-inter font-semibold mb-4">Customer Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-bookworld-accent transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-bookworld-accent transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-bookworld-accent transition-colors">Track Your Order</a></li>
              <li><a href="#" className="hover:text-bookworld-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-bookworld-accent transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
          <p className="font-inter">© 2024 Bookworld India. All rights reserved. | Discover, Read, Grow.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
