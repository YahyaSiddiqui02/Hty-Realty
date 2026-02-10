import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Home, Lightbulb, Maximize } from 'lucide-react';
import { Link } from 'react-router-dom';

const DesignStudio = () => {
  const services = [
    {
      icon: Palette,
      title: 'Interior Customization',
      description:
        'Choose from a curated selection of finishes, fixtures, and color palettes to personalize your space',
    },
    {
      icon: Home,
      title: 'Architectural Modifications',
      description:
        'Work with our architects to modify layouts and optimize space according to your lifestyle',
    },
    {
      icon: Lightbulb,
      title: 'Smart Home Integration',
      description:
        'Integrate cutting-edge home automation systems for convenience, security, and energy efficiency',
    },
    {
      icon: Maximize,
      title: 'Space Planning',
      description:
        'Expert consultation on furniture placement and room functionality to maximize your living experience',
    },
  ];

  return (
    <div data-testid="design-studio-page">
      {/* Hero Section */}
      <section className="py-32 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              data-testid="design-studio-hero-heading"
              className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold mb-8 tracking-tight"
            >
              Design Studio
            </h1>
            <p className="text-xl text-stone-300 leading-relaxed">
              Craft your dream home with expert guidance and endless possibilities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 mb-8">
              Your Vision, Our Expertise
            </h2>
            <p className="text-lg text-stone-600 leading-relaxed mb-6">
              At HTY REALTY Design Studio, we believe every home should be as unique as its owner.
              Our team of expert architects and interior designers work closely with you to bring your
              vision to life, ensuring every detail reflects your personal style and lifestyle needs.
            </p>
            <p className="text-lg text-stone-600 leading-relaxed">
              From conceptual 3D walkthroughs to material selection, we guide you through every step
              of the design journey, making your dream home a reality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 mb-6">
              Our Services
            </h2>
            <p className="text-stone-600 text-lg max-w-3xl mx-auto">
              Comprehensive design solutions tailored to your preferences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  data-testid={`service-card-${index}`}
                  className="feature-card"
                >
                  <Icon className="w-12 h-12 text-yellow-600 mb-6" />
                  <h3 className="text-2xl font-playfair font-bold text-slate-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-stone-600 leading-relaxed">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 mb-12 text-center">
            Design Inspiration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'https://images.unsplash.com/photo-1653652445848-ddc5a1c6472c?crop=entropy&cs=srgb&fm=jpg&q=85&w=600',
              'https://images.unsplash.com/photo-1601002257790-ebe0966a85ae?crop=entropy&cs=srgb&fm=jpg&q=85&w=600',
              'https://images.unsplash.com/photo-1632312384657-68bda3b30cd1?crop=entropy&cs=srgb&fm=jpg&q=85&w=600',
              'https://images.unsplash.com/photo-1748334118502-965c94e2cac3?crop=entropy&cs=srgb&fm=jpg&q=85&w=600',
              'https://images.unsplash.com/photo-1717310642410-7b1de38a0d2c?crop=entropy&cs=srgb&fm=jpg&q=85&w=600',
              'https://images.unsplash.com/photo-1716396676244-98917bb7b971?crop=entropy&cs=srgb&fm=jpg&q=85&w=600',
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="relative h-80 overflow-hidden group"
              >
                <img
                  src={image}
                  alt={`Design ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
              Ready to Design Your Dream Home?
            </h2>
            <p className="text-xl text-stone-300 mb-12">
              Schedule a consultation with our design team today
            </p>
            <Link
              to="/contact"
              data-testid="design-studio-cta-button"
              className="inline-block bg-yellow-600 text-slate-900 px-12 py-4 text-sm font-bold uppercase tracking-widest hover:bg-yellow-500 transition-colors"
            >
              Book Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DesignStudio;
