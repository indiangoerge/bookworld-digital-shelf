
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import Header from '@/components/Header';
import BookGrid from '@/components/BookGrid';
import Footer from '@/components/Footer';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const { setSearchQuery } = useAppContext();
  const query = searchParams.get('q') || '';

  // Set the search query when component mounts or query changes
  React.useEffect(() => {
    setSearchQuery(query);
  }, [query, setSearchQuery]);

  return (
    <div className="min-h-screen bg-bookworld-bg font-inter">
      <Header />
      <BookGrid />
      <Footer />
    </div>
  );
};

export default SearchResults;
