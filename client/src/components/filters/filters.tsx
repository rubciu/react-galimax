import React, { useState, useEffect } from "react";
import { getCachedCategories } from "../../queries/category";
import { GetCategories_categories } from "../../queries/category/__generated__/GetCategories";
import SelectInput from "../select-input/select-input";

interface ProductFiltersProps {
  apolloClient: any;
}

interface FiltersState {
  filters: {
    category: string;
  };
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ apolloClient }) => {
  const [categories, setCategories] = useState<GetCategories_categories[]>([]);
  const [filtersState, setFiltersState] = useState<FiltersState>({
    filters: {
      category: "",
    },
  });

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;

    setFiltersState({
      filters: { category },
    });
  };

  useEffect(() => {
    getCachedCategories(apolloClient.client)
      .then((result) => {
        setCategories(result.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h3>Product Filters</h3>
      {categories && categories.length > 0 ? (
        <SelectInput
          selectedValue={filtersState.filters.category}
          options={categories}
          handleChange={handleCategoryChange}
        />
      ) : null}
    </div>
  );
};

export default ProductFilters;
