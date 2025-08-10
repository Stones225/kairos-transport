import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon, TruckIcon } from '@heroicons/react/24/outline';

const PremiumHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Accueil', path: '/', anchor: 'hero' },
    { name: 'Services', path: '/', anchor: 'services' },
    { name: 'Véhicules', path: '/', anchor: 'vehicles' },
    { name: 'Tarifs', path: '/', anchor: 'tarifs' },
    { name: 'À propos', path: '/', anchor: 'about' },
    { name: 'Contact', path: '/', anchor: 'contact' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Galerie', path: '/gallery' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item: any) => {
    if (item.anchor) {
      if (location.pathname === '/') {
        const element = document.getElementById(item.anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.location.href = `/#${item.anchor}`;
      }
    }
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: 'easeOut' }
  };

  const menuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: 'auto' }
  };

  const menuTransition = {
    duration: 0.3
  };

  const navItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  const getNavItemTransition = (i: number) => ({
    delay: i * 0.1,
    duration: 0.5
  });

  return (
    <motion.header
      initial="initial"
      animate="animate"
      variants={headerVariants}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass-morphism shadow-soft' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Premium Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-orange-400 to-primary-orange-600 rounded-xl flex items-center justify-center shadow-glow group-hover:shadow-medium transition-all duration-300">
                  <TruckIcon className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-primary-orange-400 to-primary-orange-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-display font-bold text-primary-gray-700 group-hover:text-primary-orange-500 transition-colors">
                  KAIROS
                </span>
                <span className="text-xs font-medium text-primary-gray-500 -mt-1">
                  Car Services
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {item.anchor ? (
                  <motion.button
                    onClick={() => handleNavClick(item)}
                    className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
                      isActive(item.path)
                        ? 'text-primary-orange-500'
                        : 'text-primary-gray-600 hover:text-primary-orange-500'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                    <motion.div
                      className="absolute inset-0 bg-primary-orange-50 rounded-xl -z-10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.button>
                ) : (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to={item.path}
                      className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
                        isActive(item.path)
                          ? 'text-primary-orange-500'
                          : 'text-primary-gray-600 hover:text-primary-orange-500'
                      }`}
                    >
                      {item.name}
                      <motion.div
                        className="absolute inset-0 bg-primary-orange-50 rounded-xl -z-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </nav>

          {/* Premium CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/booking"
                className="relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-orange-500 to-primary-orange-600 text-white font-semibold rounded-xl shadow-glow hover:shadow-medium transition-all duration-300 group overflow-hidden"
              >
                <span className="relative z-10">Réserver</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-orange-600 to-primary-orange-700"
                  initial={{ x: '100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-primary-gray-600 hover:text-primary-orange-500 hover:bg-primary-orange-50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 90, opacity: 1 }}
                  exit={{ rotate: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <XMarkIcon className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Bars3Icon className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={menuTransition}
            className="lg:hidden glass-morphism border-t border-primary-gray-200"
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={navItemVariants}
                  transition={getNavItemTransition(index)}
                >
                  {item.anchor ? (
                    <motion.button
                      onClick={() => handleNavClick(item)}
                      className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                        isActive(item.path)
                          ? 'text-primary-orange-500 bg-primary-orange-50'
                          : 'text-primary-gray-600 hover:text-primary-orange-500 hover:bg-primary-orange-50'
                      }`}
                      whileHover={{ x: 8 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.name}
                    </motion.button>
                  ) : (
                    <motion.div
                      whileHover={{ x: 8 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                          isActive(item.path)
                            ? 'text-primary-orange-500 bg-primary-orange-50'
                            : 'text-primary-gray-600 hover:text-primary-orange-500 hover:bg-primary-orange-50'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              ))}
              
              <motion.div
                custom={navItems.length}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
                transition={getNavItemTransition(navItems.length)}
                className="pt-4 border-t border-primary-gray-200 mt-4"
              >
                <Link
                  to="/booking"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center px-4 py-3 bg-gradient-to-r from-primary-orange-500 to-primary-orange-600 text-white font-semibold rounded-xl shadow-glow hover:shadow-medium transition-all duration-300"
                >
                  Réserver maintenant
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default PremiumHeader;