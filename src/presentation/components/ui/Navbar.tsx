
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-bunny-yellow/90 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-bunny-black font-bold text-xl">Bunny</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-bunny-black font-medium hover:text-bunny-black/80 transition-colors"
          >
            Inicio
          </Link>
          <Link
            to="/docs"
            className="text-bunny-black font-medium hover:text-bunny-black/80 transition-colors"
          >
            Documentación
          </Link>
          <a
            href="https://github.com/bunny/bunny-js"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bunny-black font-medium hover:text-bunny-black/80 transition-colors"
          >
            GitHub
          </a>
          <Button
            className="bg-bunny-black text-bunny-yellow hover:bg-bunny-black/90"
            asChild
          >
            <Link to="/docs">Comenzar con Bunny</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            <X className="h-6 w-6 text-bunny-black" />
          ) : (
            <Menu className="h-6 w-6 text-bunny-black" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-bunny-yellow-light">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              to="/"
              className="text-bunny-black font-medium hover:text-bunny-black/80 transition-colors px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/docs"
              className="text-bunny-black font-medium hover:text-bunny-black/80 transition-colors px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Documentación
            </Link>
            <a
              href="https://github.com/bunny/bunny-js"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bunny-black font-medium hover:text-bunny-black/80 transition-colors px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              GitHub
            </a>
            <Button
              className="bg-bunny-black text-bunny-yellow hover:bg-bunny-black/90 mt-2"
              asChild
              onClick={() => setIsMenuOpen(false)}
            >
              <Link to="/docs">Comenzar con Bunny</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
