
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
  description?: string;
  pages?: number;
  publishedYear?: number;
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
  // Fiction Books
  {
    id: 1,
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    price: 299,
    mrp: 399,
    rating: 4.8,
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    badge: "Bestseller",
    category: "fiction",
    description: "A reclusive Hollywood icon finally tells her story to a young journalist.",
    pages: 400,
    publishedYear: 2017,
    publisher: "Atria Books"
  },
  {
    id: 2,
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 350,
    mrp: 450,
    rating: 4.6,
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
    badge: "New Arrival",
    category: "fiction",
    description: "Between life and death is a library, and within that library, the shelves go on forever.",
    pages: 288,
    publishedYear: 2020,
    publisher: "Canongate Books"
  },
  {
    id: 3,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 275,
    mrp: 350,
    rating: 4.5,
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    badge: "Trending",
    category: "mystery",
    description: "A woman's act of violence against her husband and her refusal to speak.",
    pages: 336,
    publishedYear: 2019,
    publisher: "Celadon Books"
  },
  {
    id: 4,
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    price: 399,
    mrp: 499,
    rating: 4.7,
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop",
    category: "fiction",
    description: "A coming-of-age story and murder mystery set in the marshes of North Carolina.",
    pages: 384,
    publishedYear: 2018,
    publisher: "Putnam"
  },
  {
    id: 5,
    title: "The Thursday Murder Club",
    author: "Richard Osman",
    price: 320,
    mrp: 420,
    rating: 4.4,
    cover: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=300&h=400&fit=crop",
    category: "mystery",
    description: "Four unlikely friends meet weekly to investigate cold cases.",
    pages: 368,
    publishedYear: 2020,
    publisher: "Viking"
  },

  // Non-Fiction Books
  {
    id: 6,
    title: "Atomic Habits",
    author: "James Clear",
    price: 450,
    mrp: 599,
    rating: 4.9,
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    badge: "Popular",
    category: "non-fiction",
    description: "Tiny changes, remarkable results. A proven way to build good habits and break bad ones.",
    pages: 320,
    publishedYear: 2018,
    publisher: "Avery"
  },
  {
    id: 7,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    price: 525,
    mrp: 699,
    rating: 4.6,
    cover: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=400&fit=crop",
    category: "non-fiction",
    description: "How Homo sapiens became the dominant species on Earth.",
    pages: 464,
    publishedYear: 2011,
    publisher: "Harper"
  },
  {
    id: 8,
    title: "The Power of Now",
    author: "Eckhart Tolle",
    price: 375,
    mrp: 495,
    rating: 4.5,
    cover: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=300&h=400&fit=crop",
    category: "non-fiction",
    description: "A guide to spiritual enlightenment and living in the present moment.",
    pages: 236,
    publishedYear: 1997,
    publisher: "New World Library"
  },

  // Biography Books
  {
    id: 9,
    title: "Educated",
    author: "Tara Westover",
    price: 399,
    mrp: 499,
    rating: 4.7,
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    category: "biography",
    description: "A memoir about a woman who was kept out of school but went on to earn a PhD from Cambridge.",
    pages: 334,
    publishedYear: 2018,
    publisher: "Random House"
  },
  {
    id: 10,
    title: "Steve Jobs",
    author: "Walter Isaacson",
    price: 650,
    mrp: 850,
    rating: 4.6,
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    category: "biography",
    description: "The exclusive biography of Apple's co-founder based on extensive interviews.",
    pages: 656,
    publishedYear: 2011,
    publisher: "Simon & Schuster"
  },

  // Children's Books
  {
    id: 11,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    price: 350,
    mrp: 450,
    rating: 4.9,
    cover: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=300&h=400&fit=crop",
    category: "children",
    description: "The magical story of a boy wizard's first year at Hogwarts School.",
    pages: 309,
    publishedYear: 1997,
    publisher: "Bloomsbury"
  },
  {
    id: 12,
    title: "The Very Hungry Caterpillar",
    author: "Eric Carle",
    price: 199,
    mrp: 299,
    rating: 4.8,
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
    category: "children",
    description: "A classic children's picture book about a caterpillar's transformation.",
    pages: 32,
    publishedYear: 1969,
    publisher: "World Publishing Company"
  },
  {
    id: 13,
    title: "Wonder",
    author: "R.J. Palacio",
    price: 285,
    mrp: 385,
    rating: 4.7,
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop",
    category: "children",
    description: "A story about a boy with facial differences who enters mainstream school for the first time.",
    pages: 315,
    publishedYear: 2012,
    publisher: "Knopf Books"
  },

  // Science Books
  {
    id: 14,
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    price: 425,
    mrp: 550,
    rating: 4.4,
    cover: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=300&h=400&fit=crop",
    category: "science",
    description: "An exploration of cosmology and the nature of time and space.",
    pages: 256,
    publishedYear: 1988,
    publisher: "Bantam"
  },
  {
    id: 15,
    title: "The Gene: An Intimate History",
    author: "Siddhartha Mukherjee",
    price: 575,
    mrp: 750,
    rating: 4.5,
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    category: "science",
    description: "The story of genetics from Mendel to modern gene therapy.",
    pages: 608,
    publishedYear: 2016,
    publisher: "Scribner"
  },

  // History Books
  {
    id: 16,
    title: "The Guns of August",
    author: "Barbara Tuchman",
    price: 495,
    mrp: 650,
    rating: 4.6,
    cover: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=400&fit=crop",
    category: "history",
    description: "A detailed account of the first month of World War I.",
    pages: 511,
    publishedYear: 1962,
    publisher: "Macmillan"
  },

  // Romance Books
  {
    id: 17,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 225,
    mrp: 325,
    rating: 4.8,
    cover: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=300&h=400&fit=crop",
    category: "romance",
    description: "A classic romance novel about Elizabeth Bennet and Mr. Darcy.",
    pages: 432,
    publishedYear: 1813,
    publisher: "T. Egerton"
  },
  {
    id: 18,
    title: "The Hating Game",
    author: "Sally Thorne",
    price: 299,
    mrp: 399,
    rating: 4.3,
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    category: "romance",
    description: "A contemporary enemies-to-lovers office romance.",
    pages: 352,
    publishedYear: 2016,
    publisher: "William Morrow"
  },

  // More Bestsellers and Popular Books
  {
    id: 19,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 195,
    mrp: 295,
    rating: 4.2,
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    badge: "Bestseller",
    category: "fiction",
    description: "A philosophical story about a shepherd's journey to find treasure.",
    pages: 163,
    publishedYear: 1988,
    publisher: "HarperOne"
  },
  {
    id: 20,
    title: "1984",
    author: "George Orwell",
    price: 275,
    mrp: 375,
    rating: 4.6,
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop",
    category: "fiction",
    description: "A dystopian novel about totalitarianism and surveillance.",
    pages: 328,
    publishedYear: 1949,
    publisher: "Secker & Warburg"
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
