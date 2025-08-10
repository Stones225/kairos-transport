import React, { useState } from 'react';
import { FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // TODO: Handle form submission
    alert('Message envoyé ! Nous vous répondrons dans les plus brefs délais.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-darkGray mb-4">
            Contactez-nous
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Notre équipe est à votre disposition 24h/24 pour répondre à toutes vos questions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-primary-darkGray mb-6">
              Envoyez-nous un message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-primary-darkGray mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  required
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-darkGray mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  required
                  placeholder="votre.email@exemple.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-darkGray mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  placeholder="+221 XX XXX XX XX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-darkGray mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  required
                  placeholder="Décrivez votre besoin..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-orange text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105"
              >
                Envoyer le message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <PhoneIcon className="text-primary-orange text-3xl mx-auto mb-4" />
                <h3 className="font-semibold text-primary-darkGray mb-2">Téléphone</h3>
                <p className="text-gray-600">+221 XX XXX XX XX</p>
                <p className="text-sm text-gray-500">Disponible 24h/24</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <FaWhatsapp className="text-green-500 text-3xl mx-auto mb-4" />
                <h3 className="font-semibold text-primary-darkGray mb-2">WhatsApp</h3>
                <p className="text-gray-600">+221 XX XXX XX XX</p>
                <p className="text-sm text-gray-500">Réponse rapide</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <EnvelopeIcon className="text-primary-orange text-3xl mx-auto mb-4" />
                <h3 className="font-semibold text-primary-darkGray mb-2">Email</h3>
                <p className="text-gray-600 text-sm">contact@kairoscarservices.sn</p>
                <p className="text-sm text-gray-500">Réponse sous 24h</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <MapPinIcon className="text-primary-orange text-3xl mx-auto mb-4" />
                <h3 className="font-semibold text-primary-darkGray mb-2">Adresse</h3>
                <p className="text-gray-600">Dakar, Sénégal</p>
                <p className="text-sm text-gray-500">Quartier Almadies</p>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <ClockIcon className="text-primary-orange text-2xl mr-3" />
                <h3 className="text-xl font-semibold text-primary-darkGray">
                  Horaires de service
                </h3>
              </div>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span className="font-medium">06h00 - 22h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span className="font-medium">06h00 - 22h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span className="font-medium">08h00 - 20h00</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-3">
                  <span className="text-primary-orange font-semibold">Service d'urgence</span>
                  <span className="text-primary-orange font-semibold">24h/24 - 7j/7</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-primary-darkGray mb-6 text-center">
                Suivez-nous sur les réseaux sociaux
              </h3>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://facebook.com/kairoscarservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                >
                  <FaFacebook className="text-xl" />
                </a>
                <a
                  href="https://wa.me/221123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors"
                >
                  <FaWhatsapp className="text-xl" />
                </a>
                <a
                  href="https://instagram.com/kairoscarservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white hover:from-purple-700 hover:to-pink-600 transition-colors"
                >
                  <FaInstagram className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-16 bg-primary-red text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">🚨 Contact d'urgence</h3>
          <p className="text-xl mb-6 opacity-90">
            Besoin d'un transport urgent ? Notre service d'urgence est disponible 24h/24
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+221XXXXXXXXX"
              className="inline-flex items-center px-6 py-3 bg-white text-primary-red font-semibold rounded-lg hover:bg-gray-100 transition-all"
            >
              <PhoneIcon className="mr-2 h-5 w-5" />
              Appeler maintenant
            </a>
            <a
              href="https://wa.me/221XXXXXXXXX"
              className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-red transition-all"
            >
              <FaWhatsapp className="mr-2" />
              WhatsApp urgence
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;