import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { favoritesAPI } from '../utils/api';
import { Heart, User, Mail, Phone } from 'lucide-react';
import { ProjectCard } from '../components/ProjectCard';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchFavorites();
  }, [user]);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const response = await favoritesAPI.getAll();
      setFavorites(response.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div data-testid="dashboard-page" className="min-h-screen bg-stone-100 py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="bg-white p-8 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1
                data-testid="dashboard-welcome"
                className="text-4xl font-playfair font-bold text-slate-900 mb-2"
              >
                Welcome, {user.name}
              </h1>
              <p className="text-stone-600">Manage your profile and saved properties</p>
            </div>
            <button
              onClick={logout}
              data-testid="dashboard-logout-button"
              className="border border-slate-900 text-slate-900 px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="bg-white p-8 mb-8">
          <h2 className="text-2xl font-playfair font-bold text-slate-900 mb-6">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">Name</p>
                <p className="text-stone-900">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">Email</p>
                <p className="text-stone-900">{user.email}</p>
              </div>
            </div>
            {user.phone && (
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">Phone</p>
                  <p className="text-stone-900">{user.phone}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Saved Favorites */}
        <div className="bg-white p-8">
          <div className="flex items-center mb-6">
            <Heart className="w-6 h-6 text-yellow-600 mr-3" />
            <h2 className="text-2xl font-playfair font-bold text-slate-900">
              Saved Properties ({favorites.length})
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-stone-500">Loading favorites...</p>
            </div>
          ) : favorites.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-stone-600 mb-6">You haven\'t saved any properties yet</p>
              <button
                onClick={() => navigate('/projects')}
                data-testid="browse-projects-button"
                className="bg-slate-900 text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors"
              >
                Browse Projects
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => navigate(`/projects/${project.slug}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
