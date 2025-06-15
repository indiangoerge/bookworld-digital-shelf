
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppContext } from '@/contexts/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';

const AuthorProfile = () => {
  const { authorName } = useParams();
  const { allBooks } = useAppContext();
  const [genreFilter, setGenreFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');
  
  const formattedAuthorName = authorName?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';
  
  // Find books by this author
  const authorBooks = allBooks.filter(book => 
    book.author.toLowerCase() === formattedAuthorName.toLowerCase()
  );

  // Apply filters
  const filteredBooks = authorBooks.filter(book => {
    const genreMatch = genreFilter === 'all' || book.category === genreFilter;
    const yearMatch = yearFilter === 'all' || book.publishedYear?.toString() === yearFilter;
    return genreMatch && yearMatch;
  });

  // Get unique genres and years for filters
  const genres = [...new Set(authorBooks.map(book => book.category))].filter(Boolean);
  const years = [...new Set(authorBooks.map(book => book.publishedYear))].filter(Boolean).sort((a, b) => (b || 0) - (a || 0));

  if (authorBooks.length === 0) {
    return (
      <div className="min-h-screen bg-bookworld-bg font-inter">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Author not found</h1>
          <Link to="/" className="text-bookworld-accent hover:underline">
            Return to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bookworld-bg font-inter">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-bookworld-accent hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Books
        </Link>

        {/* Author Header */}
        <div className="bg-white rounded-lg p-8 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-32 h-32 bg-bookworld-accent rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-16 w-16 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="font-playfair text-3xl font-bold text-bookworld-primary mb-4">
                {formattedAuthorName}
              </h1>
              <p className="text-gray-600 leading-relaxed mb-4">
                {formattedAuthorName} is a renowned author known for their compelling storytelling and masterful character development. 
                With multiple bestsellers and critically acclaimed works, they have established themselves as a significant voice in contemporary literature.
              </p>
              <div className="flex gap-6 text-sm text-gray-500">
                <span><strong>{authorBooks.length}</strong> Books</span>
                <span><strong>{Math.round(authorBooks.reduce((sum, book) => sum + book.rating, 0) / authorBooks.length * 10) / 10}</strong> Avg Rating</span>
                <span><strong>{genres.length}</strong> Genres</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">Filter by:</span>
          </div>
          
          <Select value={genreFilter} onValueChange={setGenreFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              {genres.map(genre => (
                <SelectItem key={genre} value={genre || ''}>
                  {genre?.charAt(0).toUpperCase() + genre?.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map(year => (
                <SelectItem key={year} value={year?.toString() || ''}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {(genreFilter !== 'all' || yearFilter !== 'all') && (
            <Button 
              variant="outline" 
              onClick={() => {
                setGenreFilter('all');
                setYearFilter('all');
              }}
              className="text-sm"
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Books Grid */}
        <div>
          <h2 className="font-playfair text-2xl font-bold text-bookworld-primary mb-6">
            Books by {formattedAuthorName} ({filteredBooks.length})
          </h2>
          
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No books found matching the selected filters.</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AuthorProfile;
