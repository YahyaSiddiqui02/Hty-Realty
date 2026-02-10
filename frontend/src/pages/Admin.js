import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { adminAPI, contactAPI } from '../utils/api';
import { BarChart, Users, Building2, MessageSquare, DollarSign } from 'lucide-react';

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/');
      return;
    }
    fetchData();
  }, [user, isAdmin]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [analyticsRes, inquiriesRes] = await Promise.all([
        adminAPI.getAnalytics(),
        contactAPI.getAll(),
      ]);
      setAnalytics(analyticsRes.data);
      setInquiries(inquiriesRes.data.slice(0, 10));
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (inquiryId, status) => {
    try {
      await contactAPI.updateStatus(inquiryId, status);
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (!user || !isAdmin) return null;

  return (
    <div data-testid="admin-page" className="min-h-screen bg-stone-100 py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="mb-12">
          <h1
            data-testid="admin-heading"
            className="text-4xl font-playfair font-bold text-slate-900 mb-2"
          >
            Admin Dashboard
          </h1>
          <p className="text-stone-600">Manage your HTY REALTY platform</p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-stone-500">Loading dashboard...</p>
          </div>
        ) : (
          <>
            {/* Analytics Cards */}
            {analytics && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
                <div className="bg-white p-6 border-l-4 border-yellow-600">
                  <Building2 className="w-8 h-8 text-yellow-600 mb-3" />
                  <p className="text-sm text-stone-600 uppercase tracking-wider mb-1">Projects</p>
                  <p className="text-3xl font-bold text-slate-900">{analytics.projects}</p>
                </div>

                <div className="bg-white p-6 border-l-4 border-emerald-600">
                  <MessageSquare className="w-8 h-8 text-emerald-600 mb-3" />
                  <p className="text-sm text-stone-600 uppercase tracking-wider mb-1">Total Inquiries</p>
                  <p className="text-3xl font-bold text-slate-900">{analytics.inquiries}</p>
                </div>

                <div className="bg-white p-6 border-l-4 border-yellow-600">
                  <BarChart className="w-8 h-8 text-yellow-600 mb-3" />
                  <p className="text-sm text-stone-600 uppercase tracking-wider mb-1">New Inquiries</p>
                  <p className="text-3xl font-bold text-slate-900">{analytics.new_inquiries}</p>
                </div>

                <div className="bg-white p-6 border-l-4 border-slate-900">
                  <Users className="w-8 h-8 text-slate-900 mb-3" />
                  <p className="text-sm text-stone-600 uppercase tracking-wider mb-1">Users</p>
                  <p className="text-3xl font-bold text-slate-900">{analytics.users}</p>
                </div>

                <div className="bg-white p-6 border-l-4 border-emerald-600">
                  <DollarSign className="w-8 h-8 text-emerald-600 mb-3" />
                  <p className="text-sm text-stone-600 uppercase tracking-wider mb-1">Payments</p>
                  <p className="text-3xl font-bold text-slate-900">{analytics.successful_payments}</p>
                </div>
              </div>
            )}

            {/* Recent Inquiries */}
            <div className="bg-white p-8">
              <h2 className="text-2xl font-playfair font-bold text-slate-900 mb-6">
                Recent Inquiries
              </h2>

              {inquiries.length === 0 ? (
                <p className="text-center py-12 text-stone-500">No inquiries yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-stone-200">
                        <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-stone-600">
                          Name
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-stone-600">
                          Contact
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-stone-600">
                          Type
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-stone-600">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-stone-600">
                          Date
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-stone-600">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.map((inquiry) => (
                        <tr key={inquiry.id} className="border-b border-stone-100 hover:bg-stone-50">
                          <td className="py-3 px-4 text-sm text-slate-900">{inquiry.name}</td>
                          <td className="py-3 px-4 text-sm text-stone-600">
                            {inquiry.phone}
                            <br />
                            <span className="text-xs">{inquiry.email}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-block px-2 py-1 bg-stone-200 text-stone-700 text-xs uppercase">
                              {inquiry.inquiry_type}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-block px-2 py-1 text-xs uppercase ${
                                inquiry.status === 'new'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : inquiry.status === 'contacted'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-green-100 text-green-800'
                              }`}
                            >
                              {inquiry.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-stone-600">
                            {new Date(inquiry.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={inquiry.status}
                              onChange={(e) => handleStatusUpdate(inquiry.id, e.target.value)}
                              className="text-xs border border-stone-300 px-2 py-1 focus:outline-none focus:border-slate-900"
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="closed">Closed</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => alert('Add Project feature - Coming Soon')}
                className="bg-slate-900 text-white p-6 text-left hover:bg-slate-800 transition-colors"
              >
                <Building2 className="w-8 h-8 mb-3" />
                <p className="font-bold">Add New Project</p>
                <p className="text-sm text-stone-400 mt-1">Create a new property listing</p>
              </button>

              <button
                onClick={() => alert('Add Blog Post feature - Coming Soon')}
                className="bg-emerald-600 text-white p-6 text-left hover:bg-emerald-700 transition-colors"
              >
                <MessageSquare className="w-8 h-8 mb-3" />
                <p className="font-bold">Add Blog Post</p>
                <p className="text-sm text-emerald-100 mt-1">Publish news or updates</p>
              </button>

              <button
                onClick={() => alert('Add Resource feature - Coming Soon')}
                className="bg-yellow-600 text-slate-900 p-6 text-left hover:bg-yellow-500 transition-colors"
              >
                <BarChart className="w-8 h-8 mb-3" />
                <p className="font-bold">Add Resource</p>
                <p className="text-sm text-slate-700 mt-1">Upload documents or brochures</p>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
