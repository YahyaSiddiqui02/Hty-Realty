import React from 'react';
import { motion } from 'framer-motion';

export const ProjectCard = ({ project, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      data-testid={`project-card-${project.slug}`}
      className="project-card group cursor-pointer"
    >
      <div className="relative h-96 overflow-hidden">
        <img
          src={project.hero_image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 luxury-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <span className="inline-block px-3 py-1 bg-yellow-600 text-slate-900 text-xs font-bold uppercase tracking-wider mb-3">
            {project.status}
          </span>
          <h3 className="text-3xl font-playfair font-bold text-white mb-2">
            {project.title}
          </h3>
          <p className="text-stone-300 text-sm">{project.location}</p>
        </div>
      </div>
      <div className="p-6 bg-white">
        <p className="text-stone-600 text-sm leading-relaxed">{project.tagline}</p>
      </div>
    </motion.div>
  );
};
