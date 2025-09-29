
import React from "react";
import { ChevronUp } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-musician-dark border-t border-white/5 py-10">
      <div className="container mx-auto px-4 md:px-6">
      <div className="flex flex-col items-center">
        <div className="mb-6 md:mb-0 text-center">
          <p className="mb-10 text-musician-light/60 text-sm text-center">
            © {new Date().getFullYear()} Kochy. Všechna práva vyhrazena.
          </p>
          <br />
          <a className="text-musician-light/60 text-sm text-center hover:text-musician-green transition-colors duration-300" href="/#domu">
            Domů
          </a>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
