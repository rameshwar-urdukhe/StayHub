import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-brand-dark border-t border-white/5 mt-20 relative overflow-hidden">
      {/* Decorative subtle visual drop anchor flare lines */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Column 1: Brand Ecosystem (Weight 5/12) */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-brand-accent bg-clip-text text-transparent">
                Stay<span className="text-brand-accent">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-brand-muted leading-relaxed max-w-sm">
              Discover ultra-luxury villas, urban penthouses, and architectural
              escapes curated globally. Delivering premium rental standards for
              modern travelers.
            </p>

            {/* Aesthetic Mock Social Platforms Area */}
            <div className="flex items-center gap-3 pt-2">
              {["𝕏", "💼", "📸", "🌐"].map((social, idx) => (
                <span
                  key={idx}
                  className="w-8 h-8 rounded-xl bg-white/5 border border-white/5 hover:border-brand-accent/40 hover:bg-brand-accent/5 flex items-center justify-center text-xs text-slate-400 hover:text-white cursor-pointer transition-all active:scale-90"
                >
                  {social}
                </span>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Navigation Links Ecosystem (Weight 3/12) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Platform Links
            </h4>
            <div className="flex flex-col gap-2.5">
              <Link
                to="/"
                className="text-sm text-brand-muted hover:text-brand-accent transition-colors w-fit"
              >
                Home Grid Explorer
              </Link>
              <Link
                to="/wishlist"
                className="text-sm text-brand-muted hover:text-brand-accent transition-colors w-fit"
              >
                Saved Properties
              </Link>
              <Link
                to="/my-bookings"
                className="text-sm text-brand-muted hover:text-brand-accent transition-colors w-fit"
              >
                Personal Bookings
              </Link>
              <Link
                to="/profile"
                className="text-sm text-brand-muted hover:text-brand-accent transition-colors w-fit"
              >
                Account Security Settings
              </Link>
            </div>
          </div>

          {/* Column 3: Professional Support & Operations (Weight 4/12) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Corporate Desk
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5 text-sm">
                <span className="text-brand-accent mt-0.5">✉️</span>
                <div>
                  <p className="text-xs text-slate-500 font-medium">
                    Concierge Desk
                  </p>
                  <a
                    href="mailto:support@stayhub.com"
                    className="text-brand-muted hover:text-white transition-colors"
                  >
                    support@stayhub.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-sm">
                <span className="text-brand-highlight mt-0.5">📞</span>
                <div>
                  <p className="text-xs text-slate-500 font-medium">
                    International Line
                  </p>
                  <a
                    href="tel:+919876543210"
                    className="text-brand-muted hover:text-white transition-colors"
                  >
                    +91 9876543210
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Outer Legal Line Separator */}
        <div className="border-t border-white/5 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div>
            © {new Date().getFullYear()} StayHub Corp. All rights reserved
            worldwide.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span className="hover:text-slate-400 cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-slate-400 cursor-pointer transition-colors">
              Sitemap
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
