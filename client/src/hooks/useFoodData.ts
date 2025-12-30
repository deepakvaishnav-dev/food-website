import { useState, useEffect } from "react";
import axios from "axios";
import type { Food } from "../types/food";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const useFoodData = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priceSort, setPriceSort] = useState<string>("default");
  const [ratingSort, setRatingSort] = useState<string>("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState<string>("");

  const fetchFoods = async (params: Record<string, string | number>) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/foods`, {
        params,
      });
      setFoods(response.data.data || []);
      setTotalPages(response.data.totalPages || 1);
      setLoading(false);
    } catch {
      setError("Failed to fetch foods");
      setFoods([]);
      setTotalPages(1);
      setLoading(false);
    }
  };

  const clearSorts = async () => {
    setPriceSort("default");
    setRatingSort("default");
    setCurrentPage(1);
    await fetchFoods({ page: 1 });
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    const params: Record<string, string | number> = { page };
    if (search) params.search = search;

    const sortFields: string[] = [];
    const sortOrders: string[] = [];
    if (priceSort === "high-to-low") {
      sortFields.push("price");
      sortOrders.push("desc");
    } else if (priceSort === "low-to-high") {
      sortFields.push("price");
      sortOrders.push("asc");
    }
    if (ratingSort === "high-to-low") {
      sortFields.push("rating");
      sortOrders.push("desc");
    } else if (ratingSort === "low-to-high") {
      sortFields.push("rating");
      sortOrders.push("asc");
    }

    if (sortFields.length > 0) {
      params.sortBy = sortFields.join(",");
      params.sortOrder = sortOrders.join(",");
    }

    await fetchFoods(params);
  };

  const handleSortChange = async (
    newPriceSort: string,
    newRatingSort: string
  ) => {
    setPriceSort(newPriceSort);
    setRatingSort(newRatingSort);
    setCurrentPage(1);
    const params: Record<string, string | number> = { page: 1 };
    if (search) params.search = search;

    const sortFields: string[] = [];
    const sortOrders: string[] = [];
    if (newPriceSort === "high-to-low") {
      sortFields.push("price");
      sortOrders.push("desc");
    } else if (newPriceSort === "low-to-high") {
      sortFields.push("price");
      sortOrders.push("asc");
    }
    if (newRatingSort === "high-to-low") {
      sortFields.push("rating");
      sortOrders.push("desc");
    } else if (newRatingSort === "low-to-high") {
      sortFields.push("rating");
      sortOrders.push("asc");
    }

    if (sortFields.length > 0) {
      params.sortBy = sortFields.join(",");
      params.sortOrder = sortOrders.join(",");
    }

    await fetchFoods(params);
  };

  const handleSearchChange = async (value: string) => {
    setSearch(value);
    setCurrentPage(1);
    const params: Record<string, string | number> = { page: 1 };
    if (value) params.search = value;

    const sortFields: string[] = [];
    const sortOrders: string[] = [];
    if (priceSort === "high-to-low") {
      sortFields.push("price");
      sortOrders.push("desc");
    } else if (priceSort === "low-to-high") {
      sortFields.push("price");
      sortOrders.push("asc");
    }
    if (ratingSort === "high-to-low") {
      sortFields.push("rating");
      sortOrders.push("desc");
    } else if (ratingSort === "low-to-high") {
      sortFields.push("rating");
      sortOrders.push("asc");
    }

    if (sortFields.length > 0) {
      params.sortBy = sortFields.join(",");
      params.sortOrder = sortOrders.join(",");
    }

    await fetchFoods(params);
  };

  useEffect(() => {
    (async () => {
      await fetchFoods({ page: 1 });
    })();
  }, []);

  return {
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
  };
};
