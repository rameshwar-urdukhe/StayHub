import { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import API from "../utils/api";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await API.get(
          `/properties?search=${filters.search}&sort=${filters.sort}&page=${page}`,
        );
        setProperties(res.data.properties);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters, page]);

  return (
    <div className="min-h-screen bg-brand-dark text-white overflow-x-hidden flex flex-col">
      {/* 🌌 PREMIUM HERO CANVAS SECTOR */}
      <div className="relative w-full min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center pt-24 pb-12 md:pb-20 overflow-hidden shrink-0">
        {/* Ambient background architectural glow matrices */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] sm:w-[50%] h-[50%] rounded-full bg-brand-accent/10 blur-[100px] sm:blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[5%] right-[-10%] w-[50%] sm:w-[45%] h-[45%] rounded-full bg-brand-highlight/10 blur-[110px] sm:blur-[130px] pointer-events-none" />

        {/* Content Callout Stack */}
        <div className="relative z-10 max-w-4xl space-y-4 md:space-y-6 animate-fade-in px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-semibold tracking-wide text-brand-accent backdrop-blur-md">
            ✨ Premium Escape Experiences
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.15] sm:leading-tight text-white">
            Find Your Perfect Stay{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-purple-400 to-brand-highlight">
              Anywhere
            </span>
          </h1>

          <p className="max-w-md sm:max-w-xl mx-auto text-xs sm:text-base text-brand-muted font-normal leading-relaxed">
            Book ultra-luxury villas, urban penthouses, and remote architectural
            hideaways curated globally.
          </p>
        </div>

        {/* 🛠️ INTEGRATED RESPONSIVE FILTER DECK WRAPPER */}
        <div className="w-full max-w-5xl mt-10 md:mt-12 relative z-30 px-2 sm:px-4 lg:px-0">
          <div className="p-1.5 sm:p-3 rounded-2xl sm:rounded-[32px] bg-brand-surface/60 border border-white/10 backdrop-blur-xl shadow-glass transition-all duration-300">
            <SearchBar filters={filters} setFilters={setFilters} />
          </div>
        </div>
      </div>

      {/* 🏢 GRID CONTENT CONTEXT BOX PLATFORM CONTAINER */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-24 mt-4 md:mt-8 relative z-20 flex-grow">
        {/* Metric Parameter Labels Column */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-white/5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Explore Accommodations
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
              Showing premier real estate matches
            </p>
          </div>
          <div className="text-[11px] px-3 py-1.5 rounded-xl bg-brand-surface border border-white/5 text-brand-muted font-semibold">
            Total Pages:{" "}
            <span className="text-white font-bold">{totalPages}</span>
          </div>
        </div>

        {/* Core Layout Conditional Renderer Node */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="aspect-[4/3] bg-slate-800 rounded-3xl w-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-800 rounded-lg w-2/3"></div>
                  <div className="h-3 bg-slate-800 rounded-lg w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 bg-brand-surface/20 text-center py-16 px-6 max-w-md mx-auto mt-6 backdrop-blur-sm animate-fade-in">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="text-base font-bold text-white mb-1">
              No Properties Found
            </h3>
            <p className="text-xs text-brand-muted max-w-xs mx-auto leading-relaxed">
              We couldn't discover matches tailored to your parameters. Try
              adapting your filters or key phrases.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 animate-fade-in">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}

        {/* Dynamic Navigation Pagination Control Deck */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16 pt-8 border-t border-white/5">
            <button
              disabled={page === 1}
              onClick={() => {
                setPage(page - 1);
                window.scrollTo({ top: 400, behavior: "smooth" });
              }}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl border border-white/10 bg-brand-surface/40 hover:bg-white/10 text-slate-200 disabled:opacity-40 disabled:hover:bg-brand-surface/40 disabled:cursor-not-allowed transition-all"
            >
              ← Prev
            </button>

            <span className="text-xs font-bold tracking-wider bg-brand-surface px-4 py-2 rounded-xl border border-white/5 shadow-inner select-none font-mono">
              Page <span className="text-brand-accent">{page}</span> /{" "}
              {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => {
                setPage(page + 1);
                window.scrollTo({ top: 400, behavior: "smooth" });
              }}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl border border-white/10 bg-brand-surface/40 hover:bg-white/10 text-slate-200 disabled:opacity-40 disabled:hover:bg-brand-surface/40 disabled:cursor-not-allowed transition-all"
            >
              Next →
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
