import { useState } from "react";

const SearchBar = ({ filters, setFilters }) => {
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const isFiltered = filters.search !== "" || filters.sort !== "";

  const handleClear = () => {
    setFilters({
      search: "",
      minPrice: "",
      maxPrice: "",
      sort: "",
    });
  };

  // Helper text logic for mobile preview state
  const getMobileSummaryText = () => {
    if (filters.search && filters.sort) {
      const sortLabel = filters.sort === "low" ? "Low-High" : "High-Low";
      return `${filters.search} • Sorted by ${sortLabel}`;
    }
    if (filters.search) return filters.search;
    if (filters.sort)
      return `Sorted: ${filters.sort === "low" ? "Price ↑" : "Price ↓"}`;
    return "Search destinations, regions, cities...";
  };

  return (
    <div className="w-full">
      {/* 📱 VIEWPORT 1: COMPACT MOBILE TRIGGER DECK (Visible only on small screens) */}
      <div
        onClick={() => setIsMobileModalOpen(true)}
        className="flex md:hidden items-center justify-between bg-brand-surface/40 border border-white/5 rounded-2xl p-3.5 shadow-glass backdrop-blur-md active:scale-[0.98] transition-transform cursor-pointer"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-brand-accent text-base shrink-0">🔍</span>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Where to?
            </p>
            <p
              className={`text-xs truncate font-medium mt-0.5 ${isFiltered ? "text-white" : "text-slate-500"}`}
            >
              {getMobileSummaryText()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isFiltered && (
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
          )}
          <span className="text-xs bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg text-brand-muted font-bold uppercase tracking-wider">
            Filter
          </span>
        </div>
      </div>

      {/* 🖥️ VIEWPORT 2: DESKTOP EXPERT PILL BAR (Hidden on mobile devices) */}
      <div className="hidden md:block w-full bg-brand-dark/40 border border-white/5 rounded-full p-2.5 md:p-3 shadow-glass backdrop-blur-md transition-all duration-300 focus-within:border-brand-accent/30 focus-within:shadow-neon-blue">
        <div className="grid grid-cols-12 gap-0 items-center divide-x divide-white/10">
          {/* Desktop Segment: Destination Search */}
          <div className="col-span-6 flex items-center gap-3 px-4">
            <span className="text-brand-accent text-lg shrink-0 select-none">
              🔍
            </span>
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none mb-0.5">
                Where
              </label>
              <input
                type="text"
                placeholder="Search destinations, regions or cities..."
                value={filters.search}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    search: e.target.value,
                  })
                }
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 font-medium outline-none border-none p-0 focus:ring-0"
              />
            </div>
          </div>

          {/* Desktop Segment: Sorting parameter */}
          <div className="col-span-4 flex items-center gap-3 px-4 relative group">
            <span className="text-brand-highlight text-lg shrink-0 select-none">
              ⚡
            </span>
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none mb-0.5">
                Sort By
              </label>
              <select
                value={filters.sort}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    sort: e.target.value,
                  })
                }
                className="w-full bg-transparent text-sm text-white font-medium outline-none border-none p-0 focus:ring-0 cursor-pointer appearance-none relative z-10"
              >
                <option value="" className="bg-brand-surface text-brand-muted">
                  Recommended Match
                </option>
                <option value="low" className="bg-brand-surface text-white">
                  Price: Low to High
                </option>
                <option value="high" className="bg-brand-surface text-white">
                  Price: High to Low
                </option>
              </select>
            </div>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-brand-muted pointer-events-none group-hover:text-white transition-colors">
              ▼
            </span>
          </div>

          {/* Desktop Segment: Clear/Explore Actions */}
          <div className="col-span-2 pl-3 flex justify-end">
            {isFiltered ? (
              <button
                type="button"
                onClick={handleClear}
                className="w-full flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/30 hover:bg-red-500 text-red-400 hover:text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-full transition-all active:scale-95 shadow-sm"
              >
                Clear
              </button>
            ) : (
              <div className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-accent to-brand-highlight text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-full opacity-60 cursor-default select-none shadow-sm">
                Explore
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 📥 MOBILE SLIDE MODAL SHEET OVERLAY FRAME */}
      {isMobileModalOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-brand-dark/95 backdrop-blur-xl flex flex-col animate-fade-in animate-duration-200">
          {/* Modal Upper Top Control Header Bar */}
          <div className="flex items-center justify-between p-4 border-b border-white/5">
            <button
              onClick={() => setIsMobileModalOpen(false)}
              className="p-2 -ml-2 text-brand-muted hover:text-white font-medium text-sm flex items-center gap-1"
            >
              ✕ Close
            </button>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Filter Parameters
            </h3>
            <button
              disabled={!isFiltered}
              onClick={handleClear}
              className="text-xs font-bold uppercase tracking-wider text-red-400 disabled:opacity-30 disabled:pointer-events-none"
            >
              Reset
            </button>
          </div>

          {/* Modal Middle Scrolling Config parameters Sheet */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {/* Mobile Form Field 1: Destination String input */}
            <div className="flex flex-col gap-1.5 bg-brand-surface/40 border border-white/10 p-4 rounded-2xl focus-within:border-brand-accent/40 transition-all">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none">
                Where are you travelling?
              </label>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-brand-accent text-base shrink-0 select-none">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search destinations, regions or cities..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      search: e.target.value,
                    })
                  }
                  className="w-full bg-transparent text-sm text-white placeholder-slate-600 font-medium outline-none border-none p-0 focus:ring-0"
                />
              </div>
            </div>

            {/* Mobile Form Field 2: Role parameter Selection dropdown picker */}
            <div className="flex flex-col gap-1.5 bg-brand-surface/40 border border-white/10 p-4 rounded-2xl focus-within:border-brand-accent/40 transition-all relative group">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none">
                Sort Pricing Metric Order
              </label>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-brand-highlight text-base shrink-0 select-none">
                  ⚡
                </span>
                <select
                  value={filters.sort}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      sort: e.target.value,
                    })
                  }
                  className="w-full bg-transparent text-sm text-white font-medium outline-none border-none p-0 focus:ring-0 cursor-pointer appearance-none relative z-10"
                >
                  <option
                    value=""
                    className="bg-brand-surface text-brand-muted"
                  >
                    Recommended Match
                  </option>
                  <option value="low" className="bg-brand-surface text-white">
                    Price: Low to High
                  </option>
                  <option value="high" className="bg-brand-surface text-white">
                    Price: High to Low
                  </option>
                </select>
              </div>
              <span className="absolute right-4 bottom-5 text-xs text-brand-muted pointer-events-none">
                ▼
              </span>
            </div>
          </div>

          {/* Modal Bottom Fixed Submission Execution Deck */}
          <div className="p-4 border-t border-white/5 bg-brand-dark/50 backdrop-blur-md">
            <button
              onClick={() => setIsMobileModalOpen(false)}
              className="w-full bg-gradient-to-r from-brand-accent to-brand-highlight text-white text-xs font-bold uppercase tracking-wider py-4 rounded-xl shadow-neon-blue active:scale-[0.99] transition-transform pt-3.5"
            >
              See Stays ({isFiltered ? "Filters Active" : "All Listings"})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
