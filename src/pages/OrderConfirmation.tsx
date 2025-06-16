
import React from 'react';
import { CheckCircle, Download, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD001';
  const { toast } = useToast();

  const orderDetails = {
    id: orderId,
    date: new Date().toLocaleDateString(),
    total: 599,
    items: [
      { title: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid', price: 299, quantity: 1 },
      { title: 'Atomic Habits', author: 'James Clear', price: 300, quantity: 1 }
    ],
    estimatedDelivery: 'Dec 20, 2024',
    shippingAddress: '123 Book Street, Reading City, 560001'
  };

  const handleDownloadInvoice = () => {
    toast({
      title: "Invoice downloaded",
      description: `Invoice for order ${orderId} has been downloaded.`,
    });
  };

  return (
    <div className="min-h-screen bg-bookworld-bg font-inter">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
            <h1 className="font-playfair text-4xl font-bold text-bookworld-primary mb-2">
              Order Confirmed!
            </h1>
            <p className="text-xl text-gray-600">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          {/* Order Summary Card */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-bookworld-primary">Order #{orderDetails.id}</h2>
                <p className="text-gray-600">Placed on {orderDetails.date}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-bookworld-accent">₹{orderDetails.total}</p>
                <p className="text-sm text-gray-600">Total Amount</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t border-b py-6 mb-6">
              <h3 className="font-semibold text-lg mb-4">Order Items</h3>
              <div className="space-y-4">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-16 h-20 bg-gray-100 rounded flex-shrink-0"></div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-gray-600">by {item.author}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm">Quantity: {item.quantity}</span>
                        <span className="font-semibold text-bookworld-accent">₹{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Delivery Information
                </h3>
                <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
                <p className="font-medium">{orderDetails.estimatedDelivery}</p>
                <p className="text-sm text-gray-600 mt-3 mb-1">Shipping Address</p>
                <p className="font-medium">{orderDetails.shippingAddress}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">What's Next?</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• You'll receive an email confirmation shortly</li>
                  <li>• We'll notify you when your order ships</li>
                  <li>• Track your order in My Account</li>
                  <li>• Contact support if you have questions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleDownloadInvoice}
              variant="outline"
              className="flex items-center gap-2 rounded-full px-6"
            >
              <Download className="h-4 w-4" />
              Download Invoice
            </Button>
            
            <Link to="/my-account">
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-full px-6"
              >
                <Package className="h-4 w-4" />
                View My Orders
              </Button>
            </Link>
            
            <Link to="/">
              <Button
                className="bg-bookworld-accent hover:bg-orange-600 text-white flex items-center gap-2 rounded-full px-6"
              >
                Continue Shopping
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Additional Information */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
            <p className="text-sm text-blue-800 mb-3">
              If you have any questions about your order, our customer support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                Contact Support
              </Button>
              <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                View FAQ
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
