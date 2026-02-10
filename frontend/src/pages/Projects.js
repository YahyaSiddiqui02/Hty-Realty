import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectsAPI } from '../utils/api';
import { ProjectCard } from '../components/ProjectCard';
import { Filter } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, [filter]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const statusFilter = filter === 'all' ? null : filter;
      const response = await projectsAPI.getAll(statusFilter);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filters = [
    { label: 'All Projects', value: 'all' },
    { label: 'Ongoing', value: 'ongoing' },
    { label: 'Completed', value: 'completed' },
    { label: 'Upcoming', value: 'upcoming' },
  ];

  return (
    <div data-testid="projects-page">
      {/* Hero Section */}
      <section className="py-32 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              data-testid="projects-hero-heading"
              className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold mb-8 tracking-tight"
            >
              Our Leading Projects
            </h1>
            <p className="text-xl text-stone-300 leading-relaxed">
              Explore our portfolio of meticulously crafted developments across Mumbai
            </p>
          </motion.div>
        </div>
      </section>

      {/* Investigator Corner Section */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              data-testid="investigator-heading"
              className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 mb-8"
            >
              The Investigator Corner
            </h2>
            <p className="text-lg text-stone-600 leading-relaxed mb-12">
              Every HTY REALTY project begins with meticulous research and planning. Our team
              conducts comprehensive location analysis, demographic studies, environmental impact
              assessments, and market research to ensure each development meets the highest
              standards of excellence and sustainability.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="feature-card">
                <h3 className="text-2xl font-bold text-yellow-600 mb-2">100+</h3>
                <p className="text-sm text-stone-600">Data Points Analyzed</p>
              </div>
              <div className="feature-card">
                <h3 className="text-2xl font-bold text-yellow-600 mb-2">360°</h3>
                <p className="text-sm text-stone-600">Location Assessment</p>
              </div>
              <div className="feature-card">
                <h3 className="text-2xl font-bold text-yellow-600 mb-2">6 Months</h3>
                <p className="text-sm text-stone-600">Average Planning Phase</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Portfolio Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Filter className="w-5 h-5 text-stone-500" />
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                data-testid={`filter-${f.value}`}
                className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                  filter === f.value
                    ? 'bg-slate-900 text-white'
                    : 'border border-stone-300 text-stone-600 hover:border-slate-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="text-center py-20">
              <p className="text-stone-500">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-stone-500">No projects found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => navigate(`/projects/${project.slug}`)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
