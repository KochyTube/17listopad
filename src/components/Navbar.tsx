import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "/logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
//
  const navLinks = [
    { name: "Domů", href: "/#home" }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "h-16 glass-dark shadow-md" : "h-24 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-full">
        {/* Logo (zobrazí se až při scrollu) */}
        {isScrolled && (
          <a
            href="#home"
            className="text-musician-light hover:text-musician-green transition-opacity duration-500"
          >
            <img
              src={logo}
              alt="KOCHY logo"
              width={75}
              className="opacity-0 animate-fade-in"
            />
          </a>
        )}

        {/* Desktop Navigation (vpravo) */}
        <div className="hidden md:flex md:items-center md:gap-6 ml-auto">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-musician-light hover:text-musician-green transition-colors duration-300 hover-link text-sm tracking-wide"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button (vpravo) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex md:hidden text-musician-light hover:text-musician-green transition-colors ml-auto"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-dark animate-fade-in">
          <div className="flex flex-col space-y-4 px-4 py-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-musician-light hover:text-musician-green transition-colors py-2 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
