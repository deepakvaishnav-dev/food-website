import React from "react";
import { useFoodData } from "../hooks/useFoodData";
import SearchBar from "./SearchBar";
import SortControls from "./SortControls";
import FoodGrid from "./FoodGrid";
import PaginationControls from "./PaginationControls";

const FoodList: React.FC = () => {
  const {
    foods,
    loading,
    error,
    priceSort,
    ratingSort,
    currentPage,
    totalPages,
    search,
    clearSorts,
    handlePageChange,
    handleSortChange,
    handleSearchChange,
  } = useFoodData();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold  mb-8">Food Menu</h1>

      <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-8">
        <SearchBar search={search} onSearchChange={handleSearchChange} />

        <SortControls
          priceSort={priceSort}
          ratingSort={ratingSort}
          onSortChange={handleSortChange}
          onClearSorts={clearSorts}
        />
      </div>

      <FoodGrid foods={foods} />

      {foods.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No foods match the selected filters.
        </div>
      )}

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default FoodList;
