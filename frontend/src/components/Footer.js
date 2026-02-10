import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  const footerLinks = {
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Leadership', path: '/about#leadership' },
      { label: 'Careers', path: '/contact' },
      { label: 'Contact Us', path: '/contact' },
    ],
    projects: [
      { label: 'All Projects', path: '/projects' },
      { label: 'Ongoing Projects', path: '/projects?status=ongoing' },
      { label: 'Completed Projects', path: '/projects?status=completed' },
      { label: 'Upcoming Projects', path: '/projects?status=upcoming' },
    ],
    resources: [
      { label: 'Reader Corner', path: '/resources' },
      { label: 'Brochures', path: '/resources?category=brochure' },
      { label: 'News & Updates', path: '/news' },
      { label: 'Blog', path: '/news?category=blog' },
    ],
    legal: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms & Conditions', path: '/terms' },
      { label: 'Disclaimer', path: '/disclaimer' },
      { label: 'RERA Details', path: '/rera' },
    ],
  };

  return (
    <footer data-testid="main-footer" className="bg-slate-900 text-stone-100 py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h2
              data-testid="footer-brand"
              className="text-5xl font-playfair font-bold mb-6 tracking-tight"
            >
              HTY REALTY
            </h2>
            <p className="text-stone-500 mb-8 leading-relaxed">
              Redefining urban living through sophisticated design, sustainable practices, and
              architectural excellence.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                <p className="text-sm text-stone-400">
                  1B 73 Paragon Plaza, Phoenix Mall,
                  <br />
                  Kurla West, Mumbai - 400070
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-yellow-600" />
                <a
                  href="tel:+918355995682"
                  data-testid="footer-phone"
                  className="text-sm text-stone-400 hover:text-yellow-600 transition-colors"
                >
                  +91 8355995682
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-yellow-600" />
                <a
                  href="mailto:htyrealstate@gmail.com"
                  data-testid="footer-email"
                  className="text-sm text-stone-400 hover:text-yellow-600 transition-colors"
                >
                  htyrealstate@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-yellow-600">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-stone-400 hover:text-yellow-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-yellow-600">
              Projects
            </h3>
            <ul className="space-y-3">
              {footerLinks.projects.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-stone-400 hover:text-yellow-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-yellow-600">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-stone-400 hover:text-yellow-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-stone-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-stone-500">
              © {new Date().getFullYear()} HTY REALTY. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-xs text-stone-500 hover:text-yellow-600 transition-colors uppercase tracking-wider"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
