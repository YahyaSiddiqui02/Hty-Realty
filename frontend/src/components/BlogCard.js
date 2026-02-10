import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const BlogCard = ({ post }) => {
  const categoryColors = {
    news: 'bg-emerald-600',
    blog: 'bg-yellow-600',
    media: 'bg-slate-900',
    events: 'bg-stone-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      data-testid={`blog-card-${post.slug}`}
      className="group cursor-pointer"
    >
      <Link to={`/news/${post.slug}`}>
        <div className="relative h-64 overflow-hidden bg-stone-100 mb-4">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span
            className={`absolute top-4 left-4 px-3 py-1 ${categoryColors[post.category] || 'bg-slate-900'} text-white text-xs font-bold uppercase tracking-wider`}
          >
            {post.category}
          </span>
        </div>
        <h3 className="text-xl font-playfair font-bold text-slate-900 mb-2 group-hover:text-yellow-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-3">{post.excerpt}</p>
        <p className="text-xs text-stone-500 uppercase tracking-wider">
          {new Date(post.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </Link>
    </motion.div>
  );
};
