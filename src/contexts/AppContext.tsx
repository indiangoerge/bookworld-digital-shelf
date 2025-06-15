
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  mrp: number;
  rating: number;
  cover: string;
  badge?: string;
  category?: string;
  isbn?: string;
  publisher?: string;
  language?: string;
}

interface CartItem extends Book {
  quantity: number;
}

interface AppContextType {
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Filters
  activeFilter: string | null;
  setActiveFilter: (filter: string | null) => void;
  
  // Cart
  cartItems: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: number) => void;
  updateQuantity: (bookId: number, quantity: number) => void;
  getCartCount: () => number;
  
  // Wishlist
  wishlistItems: number[];
  toggleWishlist: (bookId: number) => void;
  isInWishlist: (bookId: number) => boolean;
  
  // User
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  
  // Books data
  allBooks: Book[];
  filteredBooks: Book[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const sampleBooks: Book[] = [
  {
    id: 1,
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    price: 299,
    mrp: 399,
    rating: 4.8,
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    badge: "Bestseller",
    category: "fiction"
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: 450,
    mrp: 599,
    rating: 4.9,
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop",
    badge: "Popular",
    category: "non-fiction"
  },
  {
    id: 3,
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 350,
    mrp: 450,
    rating: 4.6,
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
    badge: "New Arrival",
    category: "fiction"
  },
  {
    id: 4,
    title: "Educated",
    author: "Tara Westover",
    price: 399,
    mrp: 499,
    rating: 4.7,
    cover: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=300&h=400&fit=crop",
    category: "biography"
  },
  {
    id: 5,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 275,
    mrp: 350,
    rating: 4.5,
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    badge: "Trending",
    category: "mystery"
  },
  {
    id: 6,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    price: 350,
    mrp: 450,
    rating: 4.9,
    cover: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=300&h=400&fit=crop",
    category: "children"
  }
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allBooks] = useState<Book[]>(sampleBooks);

  // Filter books based on search and filters
  const filteredBooks = allBooks.filter(book => {
    const matchesSearch = searchQuery === '' || 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === null || 
      book.category === activeFilter ||
      (activeFilter === 'new' && book.badge === 'New Arrival') ||
      (activeFilter === 'bestseller' && book.badge === 'Bestseller') ||
      (activeFilter === 'discount' && ((book.mrp - book.price) / book.mrp) >= 0.4);
    
    return matchesSearch && matchesFilter;
  });

  const addToCart = (book: Book) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === book.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...book, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (bookId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== bookId));
  };

  const updateQuantity = (bookId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === bookId ? { ...item, quantity } : item
        )
      );
    }
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const toggleWishlist = (bookId: number) => {
    setWishlistItems(prev =>
      prev.includes(bookId)
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const isInWishlist = (bookId: number) => {
    return wishlistItems.includes(bookId);
  };

  const value: AppContextType = {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartCount,
    wishlistItems,
    toggleWishlist,
    isInWishlist,
    isLoggedIn,
    setIsLoggedIn,
    allBooks,
    filteredBooks
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
