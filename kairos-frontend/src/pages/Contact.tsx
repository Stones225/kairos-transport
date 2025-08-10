import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaFacebook, FaInstagram, FaClock } from 'react-icons/fa';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: 'Adresse',
      details: ['Dakar, Sénégal', 'Quartier Almadies']
    },
    {
      icon: FaPhone,
      title: 'Téléphone',
      details: ['+221 XX XXX XX XX', 'Disponible 24h/24']
    },
    {
      icon: FaWhatsapp,
      title: 'WhatsApp',
      details: ['+221 XX XXX XX XX', 'Réponse rapide garantie']
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      details: ['contact@kairoscarservices.sn', 'info@kairoscarservices.sn']
    }
  ];

  const subjects = [
    'Demande de devis',
    'Réservation',
    'Information sur les services',
    'Réclamation',
    'Partenariat',
    'Autre'
  ];

  const workingHours = [
    { day: 'Lundi - Vendredi', hours: '06h00 - 22h00' },
    { day: 'Samedi', hours: '06h00 - 22h00' },
    { day: 'Dimanche', hours: '08h00 - 20h00' },
    { day: 'Service d\'urgence', hours: '24h/24 - 7j/7' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1000);

    console.log('Contact form submitted:', formData);
    // TODO: Handle actual form submission
  };

  return (
    <div className="pt-16">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary-darkGray to-gray-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Contactez-nous
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Notre équipe est à votre disposition pour répondre à toutes vos questions 
            et vous accompagner dans vos projets de transport.
          </p>
        </div>
      </section>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary-darkGray mb-6">
                Envoyez-nous un message
              </h2>

              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  <strong>Message envoyé avec succès !</strong> Nous vous répondrons dans les plus brefs délais.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-primary-darkGray mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                      required
                      placeholder="votre.email@exemple.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-primary-darkGray mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                      placeholder="+221 XX XXX XX XX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-darkGray mb-2">
                      Sujet *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                      required
                    >
                      <option value="">Sélectionner un sujet</option>
                      {subjects.map((subject, index) => (
                        <option key={index} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-darkGray mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    required
                    placeholder="Décrivez votre demande en détail..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-md font-semibold transition-all ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-primary-orange hover:bg-opacity-90 transform hover:scale-105'
                  } text-white`}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                      <div className="w-16 h-16 bg-primary-orange bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="text-primary-orange text-2xl" />
                      </div>
                      <h3 className="text-lg font-semibold text-primary-darkGray mb-3">
                        {info.title}
                      </h3>
                      <div className="space-y-1 text-gray-600">
                        {info.details.map((detail, idx) => (
                          <p key={idx}>{detail}</p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Working Hours */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-6">
                  <FaClock className="text-primary-orange text-2xl mr-3" />
                  <h3 className="text-xl font-semibold text-primary-darkGray">
                    Horaires d'ouverture
                  </h3>
                </div>
                <div className="space-y-3">
                  {workingHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="font-medium text-primary-darkGray">
                        {schedule.day}
                      </span>
                      <span className="text-gray-600">
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-primary-darkGray font-medium">
                    💡 Service d'urgence disponible 24h/24 avec supplément
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-primary-darkGray mb-6 text-center">
                  Suivez-nous
                </h3>
                <div className="flex justify-center space-x-6">
                  <a
                    href="#"
                    className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                  >
                    <FaFacebook className="text-xl" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors"
                  >
                    <FaWhatsapp className="text-xl" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white hover:from-purple-700 hover:to-pink-600 transition-colors"
                  >
                    <FaInstagram className="text-xl" />
                  </a>
                </div>
                <p className="text-center text-gray-600 mt-4 text-sm">
                  Restez informés de nos actualités et promotions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact Section */}
      <section className="py-16 bg-primary-red text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">🚨 Contact d'urgence</h2>
          <p className="text-xl mb-6">
            Besoin d'un transport urgent ? Notre service d'urgence est disponible 24h/24
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+221XXXXXXXXX"
              className="inline-flex items-center px-6 py-3 bg-white text-primary-red font-semibold rounded-lg hover:bg-gray-100 transition-all"
            >
              <FaPhone className="mr-2" />
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
      </section>

      {/* Map Section Placeholder */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary-darkGray mb-4">
              Notre Localisation
            </h2>
            <p className="text-lg text-gray-600">
              Retrouvez-nous dans le quartier des Almadies à Dakar
            </p>
          </div>
          
          {/* Map Placeholder */}
          <div className="bg-gray-300 h-96 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-600">
              <FaMapMarkerAlt className="text-4xl mx-auto mb-4" />
              <p className="text-lg font-medium">Carte interactive</p>
              <p className="text-sm">Intégration Google Maps à venir</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;