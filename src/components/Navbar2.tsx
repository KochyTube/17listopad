import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "/logo.png";

const Navbar2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Domů", href: "/#domu" },
    { name: "O akci", href: "/#o-akci"},
    { name: "Program", href: "/#program" },
    { name: "Galerie", href: "/#galerie"},
    { name: "O nás", href: "/#o-nas"},
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 glass-dark shadow-md border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-full">
        {/* Logo – vždy viditelné, menší */}
        <a href="#home" className="flex items-center">
          <img
            src={logo}
            alt="KOCHY logo"
            width={60}
            className="h-10 object-contain"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-musician-light hover:text-musician-green transition-colors duration-300 text-sm tracking-wide font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-dark border-t border-white/10">
          <div className="flex flex-col space-y-3 px-4 py-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-musician-light hover:text-musician-green transition-colors py-2 px-3 rounded-lg hover:bg-white/10 text-base font-medium text-center"
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

export default Navbar2;