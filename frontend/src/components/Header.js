import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PaymentQRModal from './PaymentQRModal';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT', path: '/about' },
    { label: 'PROJECTS', path: '/projects' },
    { label: 'PORTFOLIO', path: '/portfolio' },
    { label: 'DESIGN STUDIO', path: '/design-studio' },
    { label: 'NEWS', path: '/news' },
    { label: 'CONTACT', path: '/contact' },
    { label: 'RESOURCES', path: '/resources' },
  ];

  return (
    <>
      <header
        data-testid="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center" data-testid="logo-link">
              <div className="text-2xl font-playfair font-bold tracking-tight text-slate-900">
                HTY REALTY
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8" data-testid="desktop-nav">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
                  className={`text-xs font-manrope font-medium tracking-widest uppercase transition-colors duration-300 ${
                    location.pathname === link.path
                      ? 'text-yellow-600'
                      : 'text-slate-900 hover:text-yellow-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link
                    to={user.role === 'admin' ? '/admin' : '/dashboard'}
                    data-testid="dashboard-link"
                    className="text-xs font-manrope font-medium tracking-widest uppercase text-slate-900 hover:text-yellow-600 transition-colors"
                  >
                    {user.role === 'admin' ? 'ADMIN' : 'DASHBOARD'}
                  </Link>
                  <button
                    onClick={logout}
                    data-testid="logout-button"
                    className="text-xs font-manrope font-medium tracking-widest uppercase text-slate-900 hover:text-yellow-600 transition-colors"
                  >
                    LOGOUT
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  data-testid="login-link"
                  className="text-xs font-manrope font-medium tracking-widest uppercase text-slate-900 hover:text-yellow-600 transition-colors"
                >
                  LOGIN
                </Link>
              )}

              <button
                onClick={() => setShowQR(true)}
                data-testid="quick-pay-button"
                className="bg-yellow-600 text-slate-900 px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-yellow-500 transition-colors duration-300"
              >
                QUICK PAY
              </button>
            </div>
          </div>
        </div>

        {/* Contact Bar */}
        <div className="bg-slate-900 text-stone-100 py-2">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-6">
              <a
                href="tel:+918355995682"
                data-testid="phone-link"
                className="flex items-center space-x-2 hover:text-yellow-600 transition-colors"
              >
                <Phone className="w-3 h-3" />
                <span>+91 8355995682</span>
              </a>
              <span className="hidden md:inline">|</span>
              <a
                href="mailto:htyrealstate@gmail.com"
                data-testid="email-link"
                className="hidden md:inline hover:text-yellow-600 transition-colors"
              >
                htyrealstate@gmail.com
              </a>
              <span className="hidden md:inline">|</span>
              <span className="hidden md:inline text-stone-500">Mon-Sun: 9 AM - 6 PM</span>
            </div>
            <a
              href="https://www.instagram.com/hty_real_estate?igsh=eGNmaW5wbjhwMDdv"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="instagram-link"
              className="hover:text-yellow-600 transition-colors"
            >
              FOLLOW US ON INSTAGRAM
            </a>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-28" />

      {/* Payment QR Modal */}
      <PaymentQRModal isOpen={showQR} onClose={() => setShowQR(false)} />
    </>
  );
};
