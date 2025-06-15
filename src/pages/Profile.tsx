
import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Profile = () => {
  const { isLoggedIn, setIsLoggedIn } = useAppContext();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    address: '123 Book Street, Reading City, 560001'
  });

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
              You need to be logged in to view your profile.
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

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset any changes if needed
  };

  return (
    <div className="min-h-screen bg-bookworld-bg font-inter">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="font-playfair text-3xl font-bold text-bookworld-primary">
                My Profile
              </h1>
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    className="bg-bookworld-accent hover:bg-orange-600 text-white flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-bookworld-accent rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-bookworld-primary">
                    Welcome back, {profile.name}!
                  </h2>
                  <p className="text-gray-600">Bookworld India Member</p>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="flex items-center gap-4">
                  <User className="h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Full Name
                    </label>
                    {isEditing ? (
                      <Input
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        className="w-full"
                      />
                    ) : (
                      <p className="text-bookworld-primary">{profile.name}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Email Address
                    </label>
                    {isEditing ? (
                      <Input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        className="w-full"
                      />
                    ) : (
                      <p className="text-bookworld-primary">{profile.email}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <Input
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        className="w-full"
                      />
                    ) : (
                      <p className="text-bookworld-primary">{profile.phone}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Address
                    </label>
                    {isEditing ? (
                      <Input
                        value={profile.address}
                        onChange={(e) => setProfile({...profile, address: e.target.value})}
                        className="w-full"
                      />
                    ) : (
                      <p className="text-bookworld-primary">{profile.address}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h3 className="font-semibold text-lg mb-4">Account Statistics</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-bookworld-bg rounded-lg p-4">
                    <div className="text-2xl font-bold text-bookworld-accent">12</div>
                    <div className="text-sm text-gray-600">Books Purchased</div>
                  </div>
                  <div className="bg-bookworld-bg rounded-lg p-4">
                    <div className="text-2xl font-bold text-bookworld-accent">5</div>
                    <div className="text-sm text-gray-600">Wishlist Items</div>
                  </div>
                  <div className="bg-bookworld-bg rounded-lg p-4">
                    <div className="text-2xl font-bold text-bookworld-accent">₹2,450</div>
                    <div className="text-sm text-gray-600">Total Spent</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
