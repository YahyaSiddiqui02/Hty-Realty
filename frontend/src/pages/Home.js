import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Leaf, Users, FileText } from 'lucide-react';
import { projectsAPI, blogAPI } from '../utils/api';
import { ProjectCard } from '../components/ProjectCard';
import { BlogCard } from '../components/BlogCard';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [news, setNews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image:
        'https://images.unsplash.com/photo-1632312384657-68bda3b30cd1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGV4dGVyaW9yJTIwYXJjaGl0ZWN0dXJlJTIwbXVtYmFpfGVufDB8fHx8MTc3MDcyMzAzOHww&ixlib=rb-4.1.0&q=85',
      tagline: 'Redefining Urban Living',
      subtitle: 'Where Luxury Meets Sustainability',
    },
    {
      image:
        'https://images.unsplash.com/photo-1716396676244-98917bb7b971?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHwxfHxtdW1iYWklMjBza3lsaW5lJTIwc3Vuc2V0JTIwc2VhJTIwbGlua3xlbnwwfHx8fDE3NzA3MjMwNDV8MA&ixlib=rb-4.1.0&q=85',
      tagline: 'Mumbai\'s Finest Addresses',
      subtitle: 'Architectural Excellence in Every Detail',
    },
  ];

  const quickLinks = [
    {
      icon: Building2,
      title: 'Leading Projects',
      description: 'Explore our portfolio of premium developments',
      link: '/projects',
      testId: 'quick-link-projects',
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Our commitment to green living',
      link: '/portfolio',
      testId: 'quick-link-sustainability',
    },
    {
      icon: Users,
      title: 'Design Studio',
      description: 'Customize your dream home',
      link: '/design-studio',
      testId: 'quick-link-design',
    },
    {
      icon: FileText,
      title: 'New Updates',
      description: 'Latest news and announcements',
      link: '/news',
      testId: 'quick-link-news',
    },
  ];

  useEffect(() => {
    fetchProjects();
    fetchNews();

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchNews = async () => {
    try {
      const response = await blogAPI.getAll(null, 3);
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  return (
    <div data-testid="home-page">
      {/* Hero Section with Slider */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 1 }}
            className={`absolute inset-0 ${
              index === currentSlide ? 'z-10' : 'z-0'
            }`}
          >
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.tagline}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 luxury-overlay" />
            </div>
            <div className="relative z-20 h-full flex items-center justify-center text-center px-6">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <h1
                  data-testid="hero-tagline"
                  className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-white mb-6 tracking-tight"
                >
                  {slide.tagline}
                </h1>
                <p className="text-xl md:text-2xl text-stone-300 font-manrope mb-12">
                  {slide.subtitle}
                </p>
                <Link
                  to="/contact"
                  data-testid="hero-cta-button"
                  className="inline-block bg-yellow-600 text-slate-900 px-12 py-4 text-sm font-bold uppercase tracking-widest hover:bg-yellow-500 transition-colors duration-300"
                >
                  Enquire Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              data-testid={`slide-indicator-${index}`}
              className={`w-12 h-1 transition-all duration-300 ${
                index === currentSlide ? 'bg-yellow-600 w-16' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link
                    to={link.link}
                    data-testid={link.testId}
                    className="feature-card block group"
                  >
                    <Icon className="w-10 h-10 text-yellow-600 mb-4" />
                    <h3 className="text-lg font-playfair font-bold text-slate-900 mb-2 group-hover:text-yellow-600 transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm text-stone-600 mb-4">{link.description}</p>
                    <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-slate-900 group-hover:text-yellow-600 transition-colors">
                      Explore
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-32 bg-stone-100">
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              data-testid="intro-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-slate-900 mb-8 tracking-tight"
            >
              Crafting Living Spaces
              <br />
              That Inspire
            </h2>
            <p className="text-lg text-stone-600 leading-relaxed mb-8">
              At HTY REALTY, we believe in creating more than just buildings. We craft
              experiences, communities, and lifestyles that stand the test of time. Under the
              visionary leadership of Chairman & Managing Director Mr. Hamza Siddiqui, we blend
              heritage luxury with modern sustainability to deliver Mumbai\'s finest addresses.
            </p>
            <Link
              to="/about"
              data-testid="learn-more-link"
              className="inline-block border border-slate-900 text-slate-900 px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all duration-300"
            >
              Learn More About Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {projects.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2
                  data-testid="featured-projects-heading"
                  className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 mb-4"
                >
                  Featured Projects
                </h2>
                <p className="text-stone-600">Discover our latest developments</p>
              </div>
              <Link
                to="/projects"
                data-testid="view-all-projects-link"
                className="text-xs font-bold uppercase tracking-widest text-slate-900 hover:text-yellow-600 transition-colors flex items-center"
              >
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => (window.location.href = `/projects/${project.slug}`)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest News Section */}
      {news.length > 0 && (
        <section className="py-24 bg-stone-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2
                  data-testid="latest-news-heading"
                  className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 mb-4"
                >
                  Latest Updates
                </h2>
                <p className="text-stone-600">Stay informed about our journey</p>
              </div>
              <Link
                to="/news"
                data-testid="view-all-news-link"
                className="text-xs font-bold uppercase tracking-widest text-slate-900 hover:text-yellow-600 transition-colors flex items-center"
              >
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {news.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-32 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 tracking-tight">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-xl text-stone-300 mb-12">
              Our team is here to guide you through every step of your journey
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/contact"
                data-testid="cta-contact-button"
                className="bg-yellow-600 text-slate-900 px-12 py-4 text-sm font-bold uppercase tracking-widest hover:bg-yellow-500 transition-colors duration-300"
              >
                Contact Us
              </Link>
              <Link
                to="/projects"
                data-testid="cta-browse-button"
                className="border border-white text-white px-12 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all duration-300"
              >
                Browse Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
