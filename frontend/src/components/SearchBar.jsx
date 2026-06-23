const SearchBar = ({ filters, setFilters }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search location..."
          value={filters.search}
          onChange={(e) =>
            setFilters({
              ...filters,
              search: e.target.value,
            })
          }
          className="border p-3 rounded"
        />

        <select
          value={filters.sort}
          onChange={(e) =>
            setFilters({
              ...filters,
              sort: e.target.value,
            })
          }
          className="border p-3 rounded"
        >
          <option value="">Sort By</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
        <button
          onClick={() =>
            setFilters({
              search: "",
              minPrice: "",
              maxPrice: "",
              sort: "",
            })
          }
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
