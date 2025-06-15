
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppContext } from '@/contexts/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';

const PublisherProfile = () => {
  const { publisherName } = useParams();
  const { allBooks } = useAppContext();
  const [genreFilter, setGenreFilter] = useState<string>('all');
  const [authorFilter, setAuthorFilter] = useState<string>('all');
  
  const formattedPublisherName = publisherName?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';
  
  // Find books by this publisher
  const publisherBooks = allBooks.filter(book => 
    (book.publisher || 'Penguin Random House').toLowerCase() === formattedPublisherName.toLowerCase()
  );

  // Apply filters
  const filteredBooks = publisherBooks.filter(book => {
    const genreMatch = genreFilter === 'all' || book.category === genreFilter;
    const authorMatch = authorFilter === 'all' || book.author === authorFilter;
    return genreMatch && authorMatch;
  });

  // Get unique genres and authors for filters
  const genres = [...new Set(publisherBooks.map(book => book.category))].filter(Boolean);
  const authors = [...new Set(publisherBooks.map(book => book.author))].filter(Boolean);

  if (publisherBooks.length === 0) {
    return (
      <div className="min-h-screen bg-bookworld-bg font-inter">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Publisher not found</h1>
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

        {/* Publisher Header */}
        <div className="bg-white rounded-lg p-8 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-32 h-32 bg-bookworld-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Building className="h-16 w-16 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="font-playfair text-3xl font-bold text-bookworld-primary mb-4">
                {formattedPublisherName}
              </h1>
              <p className="text-gray-600 leading-relaxed mb-4">
                {formattedPublisherName} is a leading publishing house known for bringing quality literature to readers worldwide. 
                With a diverse catalog spanning multiple genres and featuring both established and emerging authors, they continue to shape the literary landscape.
              </p>
              <div className="flex gap-6 text-sm text-gray-500">
                <span><strong>{publisherBooks.length}</strong> Books Published</span>
                <span><strong>{authors.length}</strong> Authors</span>
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

          <Select value={authorFilter} onValueChange={setAuthorFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Author" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Authors</SelectItem>
              {authors.map(author => (
                <SelectItem key={author} value={author}>
                  {author}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {(genreFilter !== 'all' || authorFilter !== 'all') && (
            <Button 
              variant="outline" 
              onClick={() => {
                setGenreFilter('all');
                setAuthorFilter('all');
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
            Books by {formattedPublisherName} ({filteredBooks.length})
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

export default PublisherProfile;
