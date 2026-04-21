
import React, { useEffect, useState } from "react";
import Navbar from "./components/layout/Navbar";
import Categories from "./components/layout/Categories";
import ImageGrid from "./components/images/ImageGrid";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import FavoritesHeader from "./components/ui/FavoritesHeader";

import { useFavorites } from "./hooks/useFavorites";
import { useInfiniteScroll } from "./hooks/useInfiniteScoll";
import { useImageFetch } from "./hooks/useimageFetch";
import { CATEGORIES } from "./config/env";

const App = () => {
  const [query, setQuery] = useState("london");
  const [page, setPage] = useState(1);
  const [showFavorites, setShowFavorites] = useState(false);

  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const {
    images,
    loading,
    loadingMore,
    error,
    hasMore,
    fetchImages,
    resetImages,
  } = useImageFetch();

  useEffect(() => {
    fetchImages(query, 1, false);
  }, []);

  useEffect(() => {
    if (page > 1) {
      // fetchImages(query, 1, false);
      fetchImages(query, page, true);
    }
  }, [page]);

  useInfiniteScroll(() => {
    if (!loadingMore && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [loadingMore, hasMore, loading]);

  const handleSearch = () => {
    if (query.trim()) {
      setPage(1);
      resetImages();
      fetchImages(query, 1, false);
      setShowFavorites(false);
    }
  };

  const handleCategoryClick = (cat) => {
    const searchTerm = cat === "Trending" ? "nature" : cat;
    setQuery(searchTerm);
    setPage(1);
    resetImages();
    setShowFavorites(false);
    fetchImages(searchTerm, 1, false);
  };

  const displayImages = showFavorites ? favorites : images;

  console.log("images = ", images);

  return (
    <>
      <div className="min-h-screen bg-zinc-900">
        <Navbar
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
          favorites={favorites}
          showFavorites={showFavorites}
          setShowFavorites={setShowFavorites}
        />

        <Categories handleCategoryClick={handleCategoryClick} />

        <main className="max-w-6xl mx-auto px-8 py-8">
          {showFavorites && (
            <FavoritesHeader count={favorites.length} onBack={() => setShowFavorites(false)} />
          )}


          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <ImageGrid
                images={displayImages}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />

              {loadingMore && !showFavorites && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-10 h-10 border-3 border-violet-500/30 border-t-violet-500 rounded-full animate-spin"></div>
                  <p className="mt-3 text-gray-500 text-sm">Loading more...</p>
                </div>
              )}

              {!hasMore && images.length > 0 && !showFavorites && (
                <>
                  <div className="text-center py-12">
                    <p className="text-gray-600 text-sm">That's all for now</p>
                  </div>
                </>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default App;
