
import React from 'react';

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "Bookworld India has completely transformed my reading experience. The curated recommendations are spot-on, and I've discovered so many amazing authors through their platform!",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=60&h=60&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Delhi",
    rating: 5,
    text: "Fast delivery, great prices, and an incredible selection. I've been ordering from Bookworld for 2 years now, and they never disappoint. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Anita Desai",
    location: "Bangalore",
    rating: 5,
    text: "The quality of books is excellent, and their customer service is outstanding. When I had an issue with a damaged book, they replaced it immediately without any hassle.",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=60&h=60&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Pune",
    rating: 5,
    text: "I love the monthly book recommendations and the exclusive deals for members. Bookworld has helped me rediscover my passion for reading. Thank you for the amazing service!",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-bookworld-bg to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-bookworld-primary mb-4">
            What Our Readers Say
          </h2>
          <p className="font-inter text-gray-600 text-lg max-w-2xl mx-auto">
            Join thousands of satisfied readers who have made Bookworld India their trusted book companion
          </p>
          <div className="flex justify-center items-center gap-6 mt-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</span>
              <span className="font-semibold">4.8/5 rating</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <span>Based on 12,000+ reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-inter font-semibold text-bookworld-primary">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">⭐</span>
                ))}
              </div>
              
              <p className="font-inter text-gray-700 text-sm leading-relaxed">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-8 bg-white px-8 py-4 rounded-full shadow-sm border">
            <div className="text-center">
              <div className="font-bold text-2xl text-bookworld-primary">250K+</div>
              <div className="text-sm text-gray-600">Happy Readers</div>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="text-center">
              <div className="font-bold text-2xl text-bookworld-primary">1M+</div>
              <div className="text-sm text-gray-600">Books Delivered</div>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="text-center">
              <div className="font-bold text-2xl text-bookworld-primary">50K+</div>
              <div className="text-sm text-gray-600">Book Titles</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
