
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Checkout = () => {
  const { cartItems, isLoggedIn, setIsLoggedIn } = useAppContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [orderData, setOrderData] = useState({
    address: {
      fullName: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: ''
    },
    payment: {
      method: 'card',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: ''
    }
  });

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-bookworld-bg font-inter">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <User className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h1 className="font-playfair text-3xl font-bold text-bookworld-primary mb-4">
              Please Log In to Continue
            </h1>
            <p className="text-gray-600 mb-8">
              You need to be logged in to proceed with checkout.
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

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-bookworld-bg font-inter">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="font-playfair text-3xl font-bold text-bookworld-primary mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-8">
              Add some books to your cart before proceeding to checkout.
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-bookworld-accent hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handlePlaceOrder = () => {
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase. You will receive a confirmation email soon.",
    });
    // Clear cart and redirect (you can implement this in context)
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-bookworld-bg font-inter">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-bookworld-primary mb-8">
          Checkout
        </h1>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${step >= 1 ? 'bg-bookworld-accent text-white' : 'bg-gray-200'}`}>
              <MapPin className="h-4 w-4" />
              <span>Address</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${step >= 2 ? 'bg-bookworld-accent text-white' : 'bg-gray-200'}`}>
              <CreditCard className="h-4 w-4" />
              <span>Payment</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${step >= 3 ? 'bg-bookworld-accent text-white' : 'bg-gray-200'}`}>
              <Truck className="h-4 w-4" />
              <span>Review</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h2 className="font-semibold text-xl mb-6">Shipping Address</h2>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Full Name"
                      value={orderData.address.fullName}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        address: {...orderData.address, fullName: e.target.value}
                      })}
                    />
                    <Input
                      placeholder="Phone Number"
                      value={orderData.address.phone}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        address: {...orderData.address, phone: e.target.value}
                      })}
                    />
                  </div>
                  <Input
                    placeholder="Address"
                    value={orderData.address.address}
                    onChange={(e) => setOrderData({
                      ...orderData,
                      address: {...orderData.address, address: e.target.value}
                    })}
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <Input
                      placeholder="City"
                      value={orderData.address.city}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        address: {...orderData.address, city: e.target.value}
                      })}
                    />
                    <Input
                      placeholder="State"
                      value={orderData.address.state}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        address: {...orderData.address, state: e.target.value}
                      })}
                    />
                    <Input
                      placeholder="Pincode"
                      value={orderData.address.pincode}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        address: {...orderData.address, pincode: e.target.value}
                      })}
                    />
                  </div>
                </div>
                <Button 
                  onClick={() => setStep(2)}
                  className="mt-6 bg-bookworld-accent hover:bg-orange-600 text-white font-semibold rounded-full"
                >
                  Continue to Payment
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h2 className="font-semibold text-xl mb-6">Payment Information</h2>
                <div className="grid gap-4">
                  <Input
                    placeholder="Card Number"
                    value={orderData.payment.cardNumber}
                    onChange={(e) => setOrderData({
                      ...orderData,
                      payment: {...orderData.payment, cardNumber: e.target.value}
                    })}
                  />
                  <Input
                    placeholder="Name on Card"
                    value={orderData.payment.nameOnCard}
                    onChange={(e) => setOrderData({
                      ...orderData,
                      payment: {...orderData.payment, nameOnCard: e.target.value}
                    })}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="MM/YY"
                      value={orderData.payment.expiryDate}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        payment: {...orderData.payment, expiryDate: e.target.value}
                      })}
                    />
                    <Input
                      placeholder="CVV"
                      value={orderData.payment.cvv}
                      onChange={(e) => setOrderData({
                        ...orderData,
                        payment: {...orderData.payment, cvv: e.target.value}
                      })}
                    />
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <Button 
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="rounded-full"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={() => setStep(3)}
                    className="bg-bookworld-accent hover:bg-orange-600 text-white font-semibold rounded-full"
                  >
                    Review Order
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h2 className="font-semibold text-xl mb-6">Order Review</h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                      <img src={item.cover} alt={item.title} className="w-16 h-20 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-600">by {item.author}</p>
                        <p className="text-sm">Quantity: {item.quantity}</p>
                        <p className="font-semibold">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-6">
                  <Button 
                    onClick={() => setStep(2)}
                    variant="outline"
                    className="rounded-full"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handlePlaceOrder}
                    className="bg-bookworld-accent hover:bg-orange-600 text-white font-semibold rounded-full"
                  >
                    Place Order
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm border sticky top-24">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{total}</span>
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

export default Checkout;
