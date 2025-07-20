import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/map", label: "Map View" },
    { path: "/stories", label: "Stories" },
    { path: "/credits", label: "Credits" },
  ];

  const isActive = (path) => {
    location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-xl font-bold text-emerald-700">
                Jamuna Riverine Research
              </h1>
            </Link>
          </div>

          {/*Desktop Nav*/}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-emerald-700 bg-emerald-50"
                    : "text-stone-600 hover:text-emerald-700 hover:bg-stone-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/*Mobile menu button*/}
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-600"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

          {/*Mobile Nav*/}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navItems.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.path)
                        ? "text-emerald-700 bg-emerald-50"
                        : "text-stone-600 hover:text-emerald-700 hover:bg-stone-50"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>  
                ))}
              </div>
            </div>   
          )}

        </div>
    </nav>
  );
};

export default Navigation;
