import React from 'react';
import { Link } from 'react-router-dom';
import { PaperAirplaneIcon, TruckIcon, MapPinIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const ServicesOverview: React.FC = () => {
  const services = [
    {
      id: 'transfert-aeroport',
      title: 'Transfert à l\'aéroport',
      description: 'Service fiable et ponctuel depuis et vers l\'aéroport AIBD. Chauffeurs professionnels et véhicules confortables.',
      icon: PaperAirplaneIcon,
      price: 'À partir de 25 000 FCFA',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      features: ['Suivi des vols', 'Accueil personnalisé', 'Véhicules climatisés']
    },
    {
      id: 'mise-disposition-dakar',
      title: 'Mise à disposition Dakar',
      description: 'Véhicule avec chauffeur à votre disposition pour vos déplacements dans la capitale. Flexibilité maximale.',
      icon: TruckIcon,
      price: 'À partir de 8 000 FCFA/heure',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      features: ['Tarif dégressif', 'Chauffeur dédié', 'Planning flexible']
    },
    {
      id: 'mise-disposition-region',
      title: 'Déplacements régions',
      description: 'Explorez les régions du Sénégal avec nos services personnalisés. Chauffeurs connaissant parfaitement les routes.',
      icon: MapPinIcon,
      price: 'Devis personnalisé',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      features: ['Guides expérimentés', 'Itinéraires sur mesure', 'Découverte culturelle']
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-darkGray mb-4">
            Nos Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des solutions de transport adaptées à tous vos besoins, 
            avec la garantie d\'un service professionnel et sécurisé.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Service Image */}
                <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: `url(${service.image})` }}>
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <IconComponent className="text-white h-10 w-10" />
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary-darkGray mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 bg-primary-orange rounded-full mr-3 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-primary-orange">
                      {service.price}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <Link
                    to={`/services#${service.id}`}
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-primary-orange text-white rounded-lg hover:bg-opacity-90 transition-all group"
                  >
                    En savoir plus
                    <ArrowRightIcon className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center px-8 py-3 bg-primary-darkGray text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all"
          >
            Voir tous nos services
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;