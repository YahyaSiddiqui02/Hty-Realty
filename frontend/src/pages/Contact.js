import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { contactAPI } from '../utils/api';
import { toast } from 'sonner';

const Contact = () => {
  const [callbackForm, setCallbackForm] = useState({
    name: '',
    phone: '',
    email: '',
    preferred_time: '',
    message: '',
  });

  const [questionForm, setQuestionForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleCallbackSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await contactAPI.submit({
        ...callbackForm,
        inquiry_type: 'callback',
      });
      toast.success('Request submitted! We\'ll call you back soon.');
      setCallbackForm({
        name: '',
        phone: '',
        email: '',
        preferred_time: '',
        message: '',
      });
    } catch (error) {
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await contactAPI.submit({
        ...questionForm,
        inquiry_type: 'question',
      });
      toast.success('Question submitted! We\'ll respond shortly.');
      setQuestionForm({
        name: '',
        phone: '',
        email: '',
        message: '',
      });
    } catch (error) {
      toast.error('Failed to submit question. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="contact-page">
      {/* Hero Section */}
      <section className="py-32 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              data-testid="contact-hero-heading"
              className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold mb-8 tracking-tight"
            >
              Get in Touch
            </h1>
            <p className="text-xl text-stone-300 leading-relaxed">
              We\'re here to help you find your perfect home
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="feature-card text-center"
            >
              <MapPin className="w-10 h-10 text-yellow-600 mx-auto mb-4" />
              <h3 className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-wider">Address</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                1B 73 Paragon Plaza,
                <br />
                Phoenix Mall, Kurla West,
                <br />
                Mumbai - 400070
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="feature-card text-center"
            >
              <Phone className="w-10 h-10 text-yellow-600 mx-auto mb-4" />
              <h3 className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-wider">Phone</h3>
              <a
                href="tel:+918355995682"
                data-testid="contact-phone"
                className="text-sm text-stone-600 hover:text-yellow-600 transition-colors"
              >
                +91 8355995682
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="feature-card text-center"
            >
              <Mail className="w-10 h-10 text-yellow-600 mx-auto mb-4" />
              <h3 className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-wider">Email</h3>
              <a
                href="mailto:htyrealstate@gmail.com"
                data-testid="contact-email"
                className="text-sm text-stone-600 hover:text-yellow-600 transition-colors"
              >
                htyrealstate@gmail.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="feature-card text-center"
            >
              <Clock className="w-10 h-10 text-yellow-600 mx-auto mb-4" />
              <h3 className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-wider">Hours</h3>
              <p className="text-sm text-stone-600">
                Monday - Sunday
                <br />
                9:00 AM - 6:00 PM
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Request Call Back Form Section */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              data-testid="callback-form-heading"
              className="text-4xl font-playfair font-bold text-slate-900 mb-4 text-center"
            >
              Request a Call Back
            </h2>
            <p className="text-stone-600 mb-12 text-center">
              Fill out the form below and our team will reach out to you
            </p>

            <form onSubmit={handleCallbackSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  data-testid="callback-name-input"
                  value={callbackForm.name}
                  onChange={(e) => setCallbackForm({ ...callbackForm, name: e.target.value })}
                  className="px-4 py-3 border border-stone-200 bg-white focus:border-slate-900 focus:outline-none transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  data-testid="callback-phone-input"
                  value={callbackForm.phone}
                  onChange={(e) => setCallbackForm({ ...callbackForm, phone: e.target.value })}
                  className="px-4 py-3 border border-stone-200 bg-white focus:border-slate-900 focus:outline-none transition-colors"
                />
              </div>

              <input
                type="email"
                placeholder="Email Address"
                required
                data-testid="callback-email-input"
                value={callbackForm.email}
                onChange={(e) => setCallbackForm({ ...callbackForm, email: e.target.value })}
                className="w-full px-4 py-3 border border-stone-200 bg-white focus:border-slate-900 focus:outline-none transition-colors"
              />

              <input
                type="text"
                placeholder="Preferred Time (e.g., Morning, Afternoon, Evening)"
                data-testid="callback-time-input"
                value={callbackForm.preferred_time}
                onChange={(e) =>
                  setCallbackForm({ ...callbackForm, preferred_time: e.target.value })
                }
                className="w-full px-4 py-3 border border-stone-200 bg-white focus:border-slate-900 focus:outline-none transition-colors"
              />

              <textarea
                placeholder="Your Message or Query"
                required
                rows={5}
                data-testid="callback-message-input"
                value={callbackForm.message}
                onChange={(e) => setCallbackForm({ ...callbackForm, message: e.target.value })}
                className="w-full px-4 py-3 border border-stone-200 bg-white focus:border-slate-900 focus:outline-none transition-colors resize-none"
              />

              <button
                type="submit"
                disabled={submitting}
                data-testid="callback-submit-button"
                className="w-full bg-slate-900 text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Have a Question Form Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              data-testid="question-form-heading"
              className="text-4xl font-playfair font-bold text-slate-900 mb-4 text-center"
            >
              Have a Question?
            </h2>
            <p className="text-stone-600 mb-12 text-center">
              Ask us anything about our projects or services
            </p>

            <form onSubmit={handleQuestionSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  data-testid="question-name-input"
                  value={questionForm.name}
                  onChange={(e) => setQuestionForm({ ...questionForm, name: e.target.value })}
                  className="px-4 py-3 border border-stone-200 bg-white focus:border-slate-900 focus:outline-none transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  data-testid="question-phone-input"
                  value={questionForm.phone}
                  onChange={(e) => setQuestionForm({ ...questionForm, phone: e.target.value })}
                  className="px-4 py-3 border border-stone-200 bg-white focus:border-slate-900 focus:outline-none transition-colors"
                />
              </div>

              <input
                type="email"
                placeholder="Email Address"
                required
                data-testid="question-email-input"
                value={questionForm.email}
                onChange={(e) => setQuestionForm({ ...questionForm, email: e.target.value })}
                className="w-full px-4 py-3 border border-stone-200 bg-white focus:border-slate-900 focus:outline-none transition-colors"
              />

              <textarea
                placeholder="Your Question"
                required
                rows={5}
                data-testid="question-message-input"
                value={questionForm.message}
                onChange={(e) => setQuestionForm({ ...questionForm, message: e.target.value })}
                className="w-full px-4 py-3 border border-stone-200 bg-white focus:border-slate-900 focus:outline-none transition-colors resize-none"
              />

              <button
                type="submit"
                disabled={submitting}
                data-testid="question-submit-button"
                className="w-full bg-yellow-600 text-slate-900 py-4 text-xs font-bold uppercase tracking-widest hover:bg-yellow-500 transition-colors disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Ask Question'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-stone-300">
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-stone-600">Embedded Google Map</p>
          {/* In production, embed actual Google Maps iframe */}
        </div>
      </section>
    </div>
  );
};

export default Contact;
