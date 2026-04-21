import React from "react";

const FavoritesHeader = ({ count, onBack }) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-2xl font-bold text-white">My Favorites ({count})</h2>
      <button onClick={onBack} className="text-gray-400 hover:text-white transition text-sm">
        Back to Search
      </button>
    </div>
  );
};

export default FavoritesHeader;