import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Heart, Shield } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'Uncompromising quality in every project we undertake',
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Pioneering architectural solutions for modern living',
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'Transparent and ethical business practices always',
    },
    {
      icon: Shield,
      title: 'Sustainability',
      description: 'Building a greener future for generations to come',
    },
  ];

  return (
    <div data-testid="about-page">
      {/* Hero Section */}
      <section className="py-32 bg-stone-100">
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              data-testid="about-hero-heading"
              className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-slate-900 mb-8 tracking-tight"
            >
              Building Tomorrow\'s
              <br />
              Landmarks Today
            </h1>
            <p className="text-xl text-stone-600 leading-relaxed">
              HTY REALTY stands at the forefront of Mumbai\'s real estate revolution, crafting
              spaces that blend timeless elegance with contemporary innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2
                data-testid="our-story-heading"
                className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 mb-6"
              >
                Our Story
              </h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                Founded with a vision to redefine urban living, HTY REALTY has grown from a
                passionate idea into one of Mumbai\'s most trusted real estate developers. Our
                journey has been marked by an unwavering commitment to quality, innovation, and
                customer satisfaction.
              </p>
              <p className="text-stone-600 leading-relaxed mb-6">
                Every project we undertake is a testament to our dedication to architectural
                excellence and sustainable development. We don\'t just build properties; we create
                communities where families thrive and memories are made.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Today, HTY REALTY stands proud as a symbol of trust, quality, and innovation in
                the real estate landscape of Mumbai and beyond.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-96 lg:h-full"
            >
              <img
                src="https://images.unsplash.com/photo-1748334118502-965c94e2cac3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGV4dGVyaW9yJTIwYXJjaGl0ZWN0dXJlJTIwbXVtYmFpfGVufDB8fHx8MTc3MDcyMzAzOHww&ixlib=rb-4.1.0&q=85"
                alt="HTY REALTY Building"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              data-testid="leadership-heading"
              className="text-4xl md:text-5xl font-playfair font-bold mb-6"
            >
              Visionary Leadership
            </h2>
            <p className="text-stone-300 text-lg max-w-3xl mx-auto">
              Under the guidance of our distinguished leadership, HTY REALTY continues to set new
              benchmarks in real estate excellence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-center gap-12 bg-white/5 backdrop-blur-sm border border-white/10 p-12">
              <div className="w-64 h-64 bg-stone-700 flex-shrink-0 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-stone-500">
                  <span className="text-sm">Chairman Photo</span>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3
                  data-testid="chairman-name"
                  className="text-3xl font-playfair font-bold mb-2"
                >
                  Hamza Siddiqui
                </h3>
                <p className="text-yellow-600 text-sm uppercase tracking-widest mb-6">
                  Chairman & Managing Director
                </p>
                <p className="text-stone-300 leading-relaxed mb-4">
                  "At HTY REALTY, we believe that every space we create should inspire and elevate
                  the lives of those who inhabit it. Our commitment to excellence, innovation, and
                  sustainability guides every decision we make."
                </p>
                <p className="text-stone-400 leading-relaxed">
                  With over two decades of experience in real estate development, Mr. Siddiqui has
                  been instrumental in shaping Mumbai\'s skyline with projects that blend luxury,
                  functionality, and environmental consciousness.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Architecture Philosophy Section */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              data-testid="philosophy-heading"
              className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 mb-8"
            >
              Architecture Philosophy
            </h2>
            <p className="text-lg text-stone-600 leading-relaxed mb-8">
              Our architectural approach is rooted in the belief that great design transcends
              aesthetics. It\'s about creating spaces that respond to human needs, respect the
              environment, and stand as timeless works of art.
            </p>
            <p className="text-lg text-stone-600 leading-relaxed">
              We combine cutting-edge technology with traditional craftsmanship, sustainable
              materials with innovative design solutions, and functional layouts with inspiring
              aesthetics. The result is architecture that doesn\'t just house people—it enriches
              their lives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              data-testid="values-heading"
              className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 mb-6"
            >
              Our Core Values
            </h2>
            <p className="text-stone-600 text-lg max-w-3xl mx-auto">
              These principles guide everything we do and shape the way we build for the future.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  data-testid={`value-card-${index}`}
                  className="feature-card text-center"
                >
                  <Icon className="w-12 h-12 text-yellow-600 mx-auto mb-6" />
                  <h3 className="text-xl font-playfair font-bold text-slate-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-stone-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
