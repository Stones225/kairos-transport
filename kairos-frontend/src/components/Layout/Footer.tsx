import React from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaWhatsapp, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-darkGray text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <FaCar className="text-primary-orange text-2xl" />
              <span className="text-xl font-bold">KAIROS Car Services</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Votre partenaire de confiance pour tous vos déplacements au Sénégal. 
              Confort, sécurité et ponctualité garantis.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary-orange transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-orange transition-colors">
                <FaWhatsapp size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-orange transition-colors">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-primary-orange">Liens Rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/tarifs" className="text-gray-300 hover:text-white transition-colors">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-white transition-colors">
                  Galerie
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-primary-orange">Nos Services</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">Transfert aéroport</li>
              <li className="text-gray-300">Mise à disposition Dakar</li>
              <li className="text-gray-300">Déplacements régions</li>
              <li className="text-gray-300">Services événementiels</li>
              <li className="text-gray-300">Tourisme</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-primary-orange">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-primary-orange flex-shrink-0" />
                <span className="text-gray-300">Dakar, Sénégal</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhone className="text-primary-orange flex-shrink-0" />
                <span className="text-gray-300">+221 XX XXX XX XX</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-primary-orange flex-shrink-0" />
                <span className="text-gray-300">contact@kairoscarservices.sn</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaWhatsapp className="text-primary-orange flex-shrink-0" />
                <span className="text-gray-300">+221 XX XXX XX XX</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2024 KAIROS Car Services. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-300 hover:text-white text-sm transition-colors">
                Politique de confidentialité
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-white text-sm transition-colors">
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;