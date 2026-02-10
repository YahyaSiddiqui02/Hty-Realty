import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogAPI } from '../utils/api';
import { BlogCard } from '../components/BlogCard';
import { Filter } from 'lucide-react';

const News = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(searchParams.get('category') || 'all');

  const categories = [
    { label: 'All Updates', value: 'all' },
    { label: 'News', value: 'news' },
    { label: 'Blog Articles', value: 'blog' },
    { label: 'Media Coverage', value: 'media' },
    { label: 'Events', value: 'events' },
  ];

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const categoryFilter = filter === 'all' ? null : filter;
      const response = await blogAPI.getAll(categoryFilter);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    if (value === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: value });
    }
  };

  return (
    <div data-testid="news-page">
      {/* Hero Section */}
      <section className="py-32 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              data-testid="news-hero-heading"
              className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold mb-8 tracking-tight"
            >
              News & Updates
            </h1>
            <p className="text-xl text-stone-300 leading-relaxed">
              Stay informed about our latest projects, milestones, and industry insights
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter and Posts Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Filter className="w-5 h-5 text-stone-500" />
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleFilterChange(cat.value)}
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

          {/* Posts Grid */}
          {loading ? (
            <div className="text-center py-20">
              <p className="text-stone-500">Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-stone-500">No posts found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default News;
