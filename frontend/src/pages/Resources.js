import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { resourcesAPI } from '../utils/api';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { label: 'All Resources', value: 'all' },
    { label: 'Brochures', value: 'brochure' },
    { label: 'E-books', value: 'ebook' },
    { label: 'FAQs', value: 'faq' },
    { label: 'Legal Documents', value: 'legal' },
    { label: 'Research Papers', value: 'research' },
  ];

  useEffect(() => {
    fetchResources();
  }, [filter]);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const categoryFilter = filter === 'all' ? null : filter;
      const response = await resourcesAPI.getAll(categoryFilter);
      setResources(response.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="resources-page">
      {/* Hero Section */}
      <section className="py-32 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              data-testid="resources-hero-heading"
              className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold mb-8 tracking-tight"
            >
              Reader Corner
            </h1>
            <p className="text-xl text-stone-300 leading-relaxed">
              Access brochures, documents, and resources to help you make informed decisions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                data-testid={`filter-${cat.value}`}
                className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                  filter === cat.value
                    ? 'bg-slate-900 text-white'
                    : 'border border-stone-300 text-stone-600 hover:border-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Resources Grid */}
          {loading ? (
            <div className="text-center py-20">
              <p className="text-stone-500">Loading resources...</p>
            </div>
          ) : resources.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-stone-500">No resources available yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  data-testid={`resource-card-${index}`}
                  className="feature-card group"
                >
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-yellow-600 text-slate-900 text-xs font-bold uppercase tracking-wider">
                      {resource.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-playfair font-bold text-slate-900 mb-3 group-hover:text-yellow-600 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-stone-600 mb-6">{resource.description}</p>
                  <a
                    href={resource.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`download-resource-${index}`}
                    className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-slate-900 hover:text-yellow-600 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </a>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Resources;
