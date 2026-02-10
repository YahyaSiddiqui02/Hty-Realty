import React from 'react';
import { motion } from 'framer-motion';
import { Users, Leaf, Globe, Heart, Shield } from 'lucide-react';

const Portfolio = () => {
  const pillars = [
    {
      icon: Users,
      title: 'Residents',
      description: 'Community, Lifestyle & Amenities',
      color: 'text-yellow-600',
      points: [
        'Thoughtfully designed community spaces',
        'World-class amenities and facilities',
        'Safe and secure living environment',
        'Vibrant social and cultural activities',
      ],
    },
    {
      icon: Leaf,
      title: 'Sustainable Practices',
      description: 'Green Initiatives & Efficiency',
      color: 'text-emerald-600',
      points: [
        'Energy-efficient building design',
        'Solar power integration',
        'Rainwater harvesting systems',
        'Waste management and recycling',
      ],
    },
    {
      icon: Globe,
      title: 'Environment',
      description: 'Nature & Biodiversity',
      color: 'text-emerald-600',
      points: [
        'Extensive green landscaping',
        'Native plant species preservation',
        'Air quality monitoring',
        'Reduced carbon footprint',
      ],
    },
    {
      icon: Heart,
      title: 'Social',
      description: 'CSR & Community Engagement',
      color: 'text-yellow-600',
      points: [
        'Community development programs',
        'Educational initiatives',
        'Healthcare support',
        'Local employment opportunities',
      ],
    },
    {
      icon: Shield,
      title: 'Governance',
      description: 'Ethics & Transparency',
      color: 'text-slate-900',
      points: [
        'Ethical business practices',
        'Regulatory compliance',
        'Transparent operations',
        'Stakeholder accountability',
      ],
    },
  ];

  return (
    <div data-testid="portfolio-page">
      {/* Hero Section */}
      <section className="py-32 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              data-testid="portfolio-hero-heading"
              className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold mb-8 tracking-tight"
            >
              Redefining Urban Living
            </h1>
            <p className="text-xl text-stone-300 leading-relaxed">
              Our commitment to sustainability, community, and excellence in every aspect
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pillars Section */}
      {pillars.map((pillar, index) => {
        const Icon = pillar.icon;
        const bgColor = index % 2 === 0 ? 'bg-white' : 'bg-stone-100';

        return (
          <section key={index} className={`py-24 ${bgColor}`}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={index % 2 === 1 ? 'lg:col-start-2' : ''}
                >
                  <Icon className={`w-16 h-16 ${pillar.color} mb-6`} />
                  <h2
                    data-testid={`pillar-heading-${index}`}
                    className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 mb-4"
                  >
                    {pillar.title}
                  </h2>
                  <p className="text-lg text-stone-600 mb-8">{pillar.description}</p>

                  <ul className="space-y-4">
                    {pillar.points.map((point, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <span className={`mt-1 w-2 h-2 ${pillar.color} rounded-full flex-shrink-0`} />
                        <span className="text-stone-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={`relative h-96 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                >
                  <img
                    src={`https://images.unsplash.com/photo-${[
                      '1653652445848-ddc5a1c6472c',
                      '1601002257790-ebe0966a85ae',
                      '1632312384657-68bda3b30cd1',
                      '1748334118502-965c94e2cac3',
                      '1717310642410-7b1de38a0d2c',
                    ][index]}?crop=entropy&cs=srgb&fm=jpg&q=85&w=800`}
                    alt={pillar.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

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
              Be Part of Something Greater
            </h2>
            <p className="text-xl text-stone-300 mb-12">
              Discover how HTY REALTY is building a sustainable future
            </p>
            <a
              href="/projects"
              data-testid="portfolio-cta-button"
              className="inline-block bg-yellow-600 text-slate-900 px-12 py-4 text-sm font-bold uppercase tracking-widest hover:bg-yellow-500 transition-colors"
            >
              Explore Our Projects
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
