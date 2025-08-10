import React from 'react';
import { FaPlane, FaCar, FaMapMarkedAlt, FaCheckCircle, FaUsers } from 'react-icons/fa';

const Services: React.FC = () => {
  const services = [
    {
      id: 'transfert-aeroport',
      title: 'Transfert à l\'aéroport',
      subtitle: 'Service fiable vers/depuis l\'aéroport AIBD',
      icon: FaPlane,
      description: 'KAIROS Car Services assure des transferts fiables et confortables depuis et vers l\'aéroport AIBD. Nos chauffeurs professionnels garantissent ponctualité et sécurité pour tous vos déplacements aéroportuaires.',
      features: [
        'Chauffeurs professionnels expérimentés',
        'Véhicules climatisés et confortables',
        'Suivi des vols en temps réel',
        'Accueil personnalisé à l\'aéroport',
        'Service 24h/24 et 7j/7',
        'Tarifs fixes sans surprise'
      ],
      pricing: [
        { option: 'Aller simple', price: '25 000 FCFA' },
        { option: 'Aller-retour', price: '40 000 FCFA' }
      ],
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'mise-disposition-dakar',
      title: 'Mise à disposition Dakar',
      subtitle: 'Flexibilité maximale dans la capitale',
      icon: FaCar,
      description: 'Nos services de mise à disposition offrent une flexibilité maximale pour vos déplacements professionnels, réunions, événements ou visites touristiques dans la région de Dakar.',
      features: [
        'Véhicule avec chauffeur dédié',
        'Planning flexible selon vos besoins',
        'Connaissance parfaite de Dakar',
        'Tarifs dégressifs pour les longues durées',
        'Disponibilité immédiate',
        'Service discret et professionnel'
      ],
      pricing: [
        { option: 'Tarif standard', price: '10 000 FCFA/heure' },
        { option: 'À partir de 3 heures', price: '8 000 FCFA/heure' }
      ],
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'mise-disposition-region',
      title: 'Mise à disposition en région',
      subtitle: 'Découvrez le Sénégal avec nos guides',
      icon: FaMapMarkedAlt,
      description: 'Explorez les magnifiques régions du Sénégal avec nos services personnalisés. Nos chauffeurs-guides expérimentés connaissent parfaitement les routes et les richesses culturelles du pays.',
      features: [
        'Chauffeurs-guides expérimentés',
        'Connaissance approfondie des régions',
        'Itinéraires personnalisés sur mesure',
        'Véhicules adaptés aux longs trajets',
        'Conseils culturels et touristiques',
        'Sécurité et confort garantis'
      ],
      pricing: [
        { option: 'Demi-journée/Journée', price: 'Variable' },
        { option: 'Devis personnalisé', price: 'Carburant à la charge du client' }
      ],
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    }
  ];

  const vehicleTypes = [
    { name: 'Berline', capacity: '4 places', features: ['Climatisation', 'Confort standard', 'Bagages moyens'] },
    { name: 'SUV', capacity: '6 places', features: ['Climatisation', 'Confort supérieur', 'Bagages importants'] },
    { name: 'Toyota 9 places', capacity: '9 places', features: ['Climatisation', 'Idéal groupes', 'Grand espace bagages'] },
    { name: 'Mini bus', capacity: '26 places', features: ['Climatisation', 'Événements', 'Transport collectif'] }
  ];

  return (
    <div className="pt-16">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary-darkGray to-gray-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nos Services de Transport
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Des solutions de transport adaptées à tous vos besoins au Sénégal. 
            Professionnalisme, confort et sécurité au cœur de nos services.
          </p>
        </div>
      </section>

      {/* Services Detail Section */}
      {services.map((service, index) => {
        const IconComponent = service.icon;
        const isEven = index % 2 === 0;
        
        return (
          <section key={service.id} id={service.id} className={`py-20 ${isEven ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Content */}
                <div className={!isEven ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center mb-6">
                    <IconComponent className="text-primary-orange text-4xl mr-4" />
                    <div>
                      <h2 className="text-3xl font-bold text-primary-darkGray">
                        {service.title}
                      </h2>
                      <p className="text-primary-orange font-medium">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-primary-darkGray mb-4">
                      Ce qui est inclus :
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center">
                          <FaCheckCircle className="text-primary-orange mr-3 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-primary-darkGray mb-4">
                      Tarification :
                    </h3>
                    <div className="space-y-3">
                      {service.pricing.map((pricing, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span className="font-medium text-primary-darkGray">
                            {pricing.option}
                          </span>
                          <span className="text-primary-orange font-bold text-lg">
                            {pricing.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-96 object-cover rounded-lg shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Vehicle Types Section */}
      <section className="py-20 bg-primary-darkGray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Notre Flotte de Véhicules</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Des véhicules modernes et bien entretenus pour répondre à tous vos besoins de transport.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {vehicleTypes.map((vehicle, index) => (
              <div key={index} className="bg-white text-primary-darkGray rounded-lg p-6 text-center">
                <FaCar className="text-primary-orange text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{vehicle.name}</h3>
                <div className="flex items-center justify-center mb-4">
                  <FaUsers className="text-primary-orange mr-2" />
                  <span className="font-semibold">{vehicle.capacity}</span>
                </div>
                <ul className="space-y-2 text-sm">
                  {vehicle.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-primary-orange rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-orange text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à réserver votre transport ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Contactez-nous dès maintenant pour obtenir votre devis personnalisé et réserver votre véhicule.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/booking"
              className="inline-flex items-center px-8 py-3 bg-white text-primary-orange font-semibold rounded-lg hover:bg-gray-100 transition-all"
            >
              Réserver maintenant
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-orange transition-all"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;