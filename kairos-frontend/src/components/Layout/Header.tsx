import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaCar } from 'react-icons/fa';
import { UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import LanguageSelector from '../Common/LanguageSelector';
import LoginModal from '../Auth/LoginModal';
import { useTranslations } from 'next-intl';
import { useAuth } from '../../contexts/AuthContext';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  locale: string;
}

const Header: React.FC<HeaderProps> = ({ locale }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const pathname = usePathname();
  const t = useTranslations();
  const { currentUser, userProfile, logout } = useAuth();

  const navItems = [
    { name: t('nav.home'), path: `/${locale}`, anchor: 'hero' },
    { name: t('nav.services'), path: `/${locale}`, anchor: 'services' },
    { name: 'Tarifs', path: `/${locale}`, anchor: 'tarifs' },
    { name: 'À propos', path: `/${locale}`, anchor: 'about' },
    { name: t('nav.contact'), path: `/${locale}`, anchor: 'contact' },
    { name: 'FAQ', path: `/${locale}/faq` },
    { name: 'Galerie', path: `/${locale}/gallery` },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleNavClick = (item: any) => {
    if (item.anchor) {
      if (pathname === `/${locale}`) {
        const element = document.getElementById(item.anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.location.href = `/${locale}/#${item.anchor}`;
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <FaCar className="text-primary-orange text-2xl" />
            <span className="text-xl font-bold text-primary-darkGray">
              KAIROS Car Services
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              item.anchor ? (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-primary-orange border-b-2 border-primary-orange'
                      : 'text-primary-darkGray hover:text-primary-orange'
                  }`}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-primary-orange border-b-2 border-primary-orange'
                      : 'text-primary-darkGray hover:text-primary-orange'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />

            {currentUser ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 px-3 py-2 bg-primary-gray-100 rounded-lg">
                  <UserIcon className="w-4 h-4 text-primary-gray-600" />
                  <span className="text-sm font-medium text-primary-gray-700">
                    {userProfile?.firstName || 'Utilisateur'}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-primary-gray-600 hover:text-primary-orange-500 rounded-lg hover:bg-primary-gray-100 transition-colors"
                  title="Déconnexion"
                >
                  <ArrowRightOnRectangleIcon className="w-4 h-4" />
                </button>
                <Link
                  href={`/${locale}/booking`}
                  className="inline-flex items-center px-4 py-2 bg-primary-orange-500 text-white rounded-md hover:bg-primary-orange-600 transition-all font-medium"
                >
                  {t('nav.booking')}
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-4 py-2 text-primary-gray-700 hover:text-primary-orange-500 font-medium transition-colors"
                >
                  Connexion
                </button>
                <Link
                  href={`/${locale}/booking`}
                  className="inline-flex items-center px-4 py-2 bg-primary-orange-500 text-white rounded-md hover:bg-primary-orange-600 transition-all font-medium"
                >
                  {t('nav.booking')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-primary-darkGray hover:text-primary-orange focus:outline-none"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navItems.map((item) => (
              item.anchor ? (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-primary-orange bg-orange-50'
                      : 'text-primary-darkGray hover:text-primary-orange hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-primary-orange bg-orange-50'
                      : 'text-primary-darkGray hover:text-primary-orange hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
            <Link
              href={`/${locale}/booking`}
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center px-3 py-2 mt-4 bg-primary-orange text-white rounded-md hover:bg-opacity-90 transition-all font-medium"
            >
              Réserver
            </Link>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </header>
  );
};

export default Header;
