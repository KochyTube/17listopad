
import { Facebook, Instagram, Mail, Phone, Music2 } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
              <img
                src="/logo.png"
                alt="17Listopad"
                width={250}
                className="mb-6"
              />
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/profile.php?id=100079815278169" 
                className="bg-white bg-opacity-10 hover:bg-opacity-20 transition-all p-2 rounded-full"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/17_listopad_uh" 
                className="bg-white bg-opacity-10 hover:bg-opacity-20 transition-all p-2 rounded-full"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="mailto:17listopaduh@gmail.com" 
                className="bg-white bg-opacity-10 hover:bg-opacity-20 transition-all p-2 rounded-full"
                aria-label="Email"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Užitečné odkazy</h4>
            <ul className="space-y-2">
              <li>
                <a href="/#domu" className="text-gray-400 hover:text-white transition-colors">Domů</a>
              </li>
              <li>
                <a href="/#program" className="text-gray-400 hover:text-white transition-colors">Program</a>
              </li>
              <li>
                <a href="/#o-nas" className="text-gray-400 hover:text-white transition-colors">O nás</a>
              </li>
              <li>
                <a href="/#galerie" className="text-gray-400 hover:text-white transition-colors">Galerie</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Kontakt</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:17listopaduh@gmail.com" className="text-gray-400 hover:text-white transition-colors font-bold">Email</a>
              </li>
              <li>
                <a href="mailto:17listopaduh@gmail.com" className="text-gray-400 hover:text-white transition-colors">17listopaduh@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 md:mb-0 flex items-center">
            © {currentYear} Studenti pro Hradiště.
            <span className="mx-2">Web design a realizace:</span>
            <a href="https://kochy.us" target="_blank" rel="noopener noreferrer">
              <img src="https://kochy.us/logo.png" alt="Logo Kochy"  width={60} className="ml-1" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;