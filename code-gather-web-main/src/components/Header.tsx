import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Activity, Search, Sparkles, Menu, X, LogIn, LogOut, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { NotificationDropdown } from "./NotificationDropdown";
import { SearchDialog } from "./SearchDialog";

const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "Markets", path: "/markets" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "AI Signals", path: "/signals" },
  { name: "News", path: "/news" },
];

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 glass-strong border-b border-border/50"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg text-gradient">CryptoIntel</span>
              <span className="text-[10px] text-muted-foreground -mt-1">AI-Powered Insights</span>
            </div>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  className={location.pathname === item.path ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hidden sm:flex"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="w-5 h-5" />
            </Button>
            
            {user && <NotificationDropdown />}

            {!loading && (
              user ? (
                <div className="flex items-center gap-2">
                  <Link to="/pricing" className="hidden sm:block">
                    <Button variant="glow" size="sm" className="gap-2">
                      <Sparkles className="w-4 h-4" />
                      Upgrade
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="gap-2 text-muted-foreground"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Sign Out</span>
                  </Button>
                </div>
              ) : (
                <Link to="/auth">
                  <Button variant="glow" size="sm" className="gap-2">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Button>
                </Link>
              )
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${location.pathname === item.path ? "text-primary bg-primary/10" : "text-muted-foreground"}`}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
              {user ? (
                <>
                  <Link to="/pricing" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="glow" className="w-full gap-2 mt-2">
                      <Sparkles className="w-4 h-4" />
                      Upgrade to Pro
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full gap-2 mt-2"
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="glow" className="w-full gap-2 mt-2">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </motion.nav>
        )}
      </motion.header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};
