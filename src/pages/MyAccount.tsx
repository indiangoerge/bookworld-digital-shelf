
import React, { useState } from 'react';
import { User, Package, Heart, Clock, MapPin, Bell, DollarSign, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const MyAccount = () => {
  const { isLoggedIn, setIsLoggedIn } = useAppContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-bookworld-bg font-inter">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <User className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h1 className="font-playfair text-3xl font-bold text-bookworld-primary mb-4">
              Please Log In
            </h1>
            <p className="text-gray-600 mb-8">
              You need to be logged in to view your account.
            </p>
            <Button 
              onClick={() => setIsLoggedIn(true)}
              className="bg-bookworld-accent hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full"
            >
              Log In
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const tabs = [
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'recent', label: 'Recently Viewed', icon: Clock },
    { id: 'addresses', label: 'Address Book', icon: MapPin },
    { id: 'newsletter', label: 'Newsletter', icon: Bell },
    { id: 'affiliate', label: 'Affiliate Dashboard', icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-bookworld-bg font-inter">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-bookworld-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="font-semibold text-xl">John Doe</h2>
                  <p className="text-gray-600">john.doe@example.com</p>
                </div>
                
                <div className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                          activeTab === tab.id
                            ? 'bg-bookworld-accent text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {tab.label}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                {activeTab === 'orders' && (
                  <div>
                    <h2 className="font-playfair text-2xl font-bold mb-6">My Orders</h2>
                    <div className="space-y-4">
                      {[1, 2, 3].map((order) => (
                        <div key={order} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold">Order #ORD{order}001</h3>
                              <p className="text-sm text-gray-600">Placed on Dec {order + 10}, 2024</p>
                            </div>
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                              Delivered
                            </span>
                          </div>
                          <div className="flex gap-4">
                            <div className="w-16 h-20 bg-gray-100 rounded"></div>
                            <div className="flex-1">
                              <p className="font-medium">Sample Book Title</p>
                              <p className="text-sm text-gray-600">by Author Name</p>
                              <p className="text-bookworld-accent font-semibold">₹299</p>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button variant="outline" size="sm">View Details</Button>
                            <Button variant="outline" size="sm">Download Invoice</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'wishlist' && (
                  <div>
                    <h2 className="font-playfair text-2xl font-bold mb-6">My Wishlist</h2>
                    <p className="text-gray-600">
                      Visit the <Link to="/wishlist" className="text-bookworld-accent hover:underline">wishlist page</Link> to view your saved books.
                    </p>
                  </div>
                )}

                {activeTab === 'recent' && (
                  <div>
                    <h2 className="font-playfair text-2xl font-bold mb-6">Recently Viewed</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map((book) => (
                        <div key={book} className="text-center">
                          <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-2"></div>
                          <p className="text-sm font-medium">Book Title {book}</p>
                          <p className="text-xs text-gray-600">Author Name</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'addresses' && (
                  <div>
                    <h2 className="font-playfair text-2xl font-bold mb-6">Address Book</h2>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">Home</h3>
                            <p className="text-gray-600">123 Book Street, Reading City, 560001</p>
                            <p className="text-gray-600">+91 98765 43210</p>
                          </div>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                      <Button className="bg-bookworld-accent hover:bg-orange-600 text-white">
                        Add New Address
                      </Button>
                    </div>
                  </div>
                )}

                {activeTab === 'newsletter' && (
                  <div>
                    <h2 className="font-playfair text-2xl font-bold mb-6">Newsletter Preferences</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">New Arrivals</h3>
                          <p className="text-sm text-gray-600">Get notified about new books</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">Special Offers</h3>
                          <p className="text-sm text-gray-600">Receive discount codes and promotions</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'affiliate' && (
                  <div>
                    <h2 className="font-playfair text-2xl font-bold mb-6">Affiliate Dashboard</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="bg-bookworld-bg rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-bookworld-accent">24</div>
                        <div className="text-sm text-gray-600">Total Clicks</div>
                      </div>
                      <div className="bg-bookworld-bg rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-bookworld-accent">3</div>
                        <div className="text-sm text-gray-600">Conversions</div>
                      </div>
                      <div className="bg-bookworld-bg rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-bookworld-accent">₹125</div>
                        <div className="text-sm text-gray-600">Earnings</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Your Referral URL</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value="https://bookworld.com/?ref=johndoe"
                            readOnly
                            className="flex-1 px-3 py-2 border rounded-lg bg-gray-50"
                          />
                          <Button variant="outline">Copy</Button>
                        </div>
                      </div>
                      <Button className="bg-bookworld-accent hover:bg-orange-600 text-white">
                        Request Payout
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MyAccount;
