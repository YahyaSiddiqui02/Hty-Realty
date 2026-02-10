import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectsAPI, favoritesAPI } from '../utils/api';
import { MapPin, CheckCircle, Heart, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [slug]);

  const fetchProject = async () => {
    setLoading(true);
    try {
      const response = await projectsAPI.getBySlug(slug);
      setProject(response.data);
      if (user) {
        setIsFavorite(user.favorites?.includes(response.data.id) || false);
      }
    } catch (error) {
      console.error('Error fetching project:', error);
      toast.error('Project not found');
      navigate('/projects');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      toast.error('Please login to save favorites');
      navigate('/login');
      return;
    }

    try {
      if (isFavorite) {
        await favoritesAPI.remove(project.id);
        toast.success('Removed from favorites');
      } else {
        await favoritesAPI.add(project.id);
        toast.success('Added to favorites');
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      toast.error('Failed to update favorites');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-stone-500">Loading project...</p>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div data-testid="project-detail-page">
      {/* Hero Section */}
      <section className="relative h-screen">
        <img
          src={project.hero_image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 luxury-overlay" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-yellow-600 text-slate-900 text-xs font-bold uppercase tracking-wider mb-6">
              {project.status}
            </span>
            <h1
              data-testid="project-title"
              className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6 tracking-tight"
            >
              {project.title}
            </h1>
            <p className="text-xl text-stone-300 font-manrope mb-8">{project.tagline}</p>
            <div className="flex items-center justify-center text-stone-300 mb-12">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => navigate('/contact')}
                data-testid="request-details-button"
                className="bg-yellow-600 text-slate-900 px-12 py-4 text-sm font-bold uppercase tracking-widest hover:bg-yellow-500 transition-colors"
              >
                Request Details
              </button>
              <button
                onClick={toggleFavorite}
                data-testid="favorite-button"
                className="border border-white text-white p-4 hover:bg-white hover:text-slate-900 transition-all"
              >
                <Heart className={isFavorite ? 'fill-current' : ''} />
              </button>
            </div>
          </motion.div>
        </div>

        <button
          onClick={() => navigate('/projects')}
          data-testid="back-button"
          className="absolute top-8 left-8 flex items-center space-x-2 text-white hover:text-yellow-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-xs uppercase tracking-wider">Back to Projects</span>
        </button>
      </section>

      {/* Description Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-playfair font-bold text-slate-900 mb-8">About This Project</h2>
            <p className="text-lg text-stone-600 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Amenities Section */}
      {project.amenities && project.amenities.length > 0 && (
        <section className="py-24 bg-stone-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2
                data-testid="amenities-heading"
                className="text-4xl font-playfair font-bold text-slate-900 mb-12 text-center"
              >
                World-Class Amenities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.amenities.map((amenity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    data-testid={`amenity-${index}`}
                    className="flex items-center space-x-3 p-4 bg-white"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-stone-700">{amenity}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Image Gallery Section */}
      {project.images && project.images.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <h2 className="text-4xl font-playfair font-bold text-slate-900 mb-12 text-center">
              Project Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className="relative h-72 overflow-hidden group"
                >
                  <img
                    src={image}
                    alt={`${project.title} - ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Location Section */}
      {project.coordinates && (
        <section className="py-24 bg-stone-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <h2 className="text-4xl font-playfair font-bold text-slate-900 mb-12 text-center">
              Prime Location
            </h2>
            <div className="h-96 bg-stone-300 flex items-center justify-center">
              <p className="text-stone-600">Google Maps Integration</p>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-32 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
            Interested in This Project?
          </h2>
          <p className="text-xl text-stone-300 mb-12">
            Our team is ready to provide detailed information and schedule a site visit
          </p>
          <button
            onClick={() => navigate('/contact')}
            data-testid="cta-contact-button"
            className="bg-yellow-600 text-slate-900 px-12 py-4 text-sm font-bold uppercase tracking-widest hover:bg-yellow-500 transition-colors"
          >
            Contact Us Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
