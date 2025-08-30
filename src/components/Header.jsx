import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('menu'), href: '/carte' },
    { name: t('about'), href: '/a-propos' },
    { name: t('contact'), href: '/contact' },
    { name: t('reservation'), href: '/reservation' },
    { name: t('news'), href: '/actualites' },
    { name: t('guestBook'), href: '/livre-or' },
    { name: t('recruitment'), href: '/recrutement' },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-yellow-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-crepe-yellow rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl font-pacifico text-anthracite">O</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-pacifico text-anthracite">Crêperie Ozoir</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-anthracite'
                    : 'text-gray-600 hover:text-anthracite'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-crepe-yellow"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Link to="/admin" className="text-gray-600 hover:text-anthracite transition-colors">
              <Shield size={20} />
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-anthracite hover:bg-yellow-50 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-yellow-200 bg-white/95 backdrop-blur-sm"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-anthracite bg-yellow-50'
                        : 'text-gray-600 hover:text-anthracite hover:bg-yellow-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;