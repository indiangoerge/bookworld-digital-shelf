
import React, { useState } from 'react';
import { Package, Download, Eye, RotateCcw, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const OrderHistory = () => {
  const { isLoggedIn } = useAppContext();
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

  const orders = [
    {
      id: 'ORD001',
      date: 'Dec 15, 2024',
      status: 'Delivered',
      total: 599,
      items: [
        { title: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid', price: 299, quantity: 1 },
        { title: 'Atomic Habits', author: 'James Clear', price: 300, quantity: 1 }
      ]
    },
    {
      id: 'ORD002',
      date: 'Dec 10, 2024',
      status: 'Shipped',
      total: 350,
      items: [
        { title: 'The Midnight Library', author: 'Matt Haig', price: 350, quantity: 1 }
      ]
    },
    {
      id: 'ORD003',
      date: 'Dec 5, 2024',
      status: 'Processing',
      total: 275,
      items: [
        { title: 'The Silent Patient', author: 'Alex Michaelides', price: 275, quantity: 1 }
      ]
    }
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-bookworld-bg font-inter">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <Package className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h1 className="font-playfair text-3xl font-bold text-bookworld-primary mb-4">
              Please Log In
            </h1>
            <p className="text-gray-600 mb-8">
              You need to be logged in to view your order history.
            </p>
            <Button className="bg-bookworld-accent hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full">
              Log In
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownloadInvoice = (orderId: string) => {
    toast({
      title: "Invoice downloaded",
      description: `Invoice for order ${orderId} has been downloaded.`,
    });
  };

  return (
    <div className="min-h-screen bg-bookworld-bg font-inter">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-bookworld-primary mb-8">
            Order History
          </h1>
          
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                      <p className="text-gray-600">Placed on {order.date}</p>
                    </div>
                    <div className="flex flex-col md:items-end mt-2 md:mt-0">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <p className="text-lg font-semibold text-bookworld-primary mt-1">₹{order.total}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-4 p-3 border rounded-lg">
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

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      {selectedOrder === order.id ? 'Hide Details' : 'View Details'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadInvoice(order.id)}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Invoice
                    </Button>
                    
                    {order.status === 'Delivered' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <RotateCcw className="h-4 w-4" />
                          Request Return
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Contact Support
                        </Button>
                      </>
                    )}
                  </div>

                  {selectedOrder === order.id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Order Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><strong>Order ID:</strong> {order.id}</p>
                          <p><strong>Order Date:</strong> {order.date}</p>
                          <p><strong>Payment Method:</strong> Credit Card</p>
                        </div>
                        <div>
                          <p><strong>Shipping Address:</strong></p>
                          <p>123 Book Street, Reading City, 560001</p>
                          <p><strong>Estimated Delivery:</strong> Dec 20, 2024</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/my-account">
              <Button variant="outline" className="rounded-full">
                Back to My Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderHistory;
