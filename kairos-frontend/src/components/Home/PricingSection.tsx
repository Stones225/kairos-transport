import React from 'react';
import { Link } from 'react-router-dom';
import { PaperAirplaneIcon, TruckIcon, MapPinIcon, ArrowDownTrayIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const PricingSection: React.FC = () => {
  const services = [
    {
      icon: PaperAirplaneIcon,
      title: 'Transfert Aéroport',
      description: 'Service fiable vers/depuis l\'aéroport AIBD',
      basePrice: '25 000',
      features: [
        'Suivi des vols en temps réel',
        'Accueil personnalisé',
        'Service 24h/24',
        'Véhicules climatisés'
      ],
      pricing: [
        { vehicle: 'Berline', price: '25 000 FCFA' },
        { vehicle: 'SUV', price: '30 000 FCFA' },
        { vehicle: 'Toyota 9 places', price: '35 000 FCFA' },
        { vehicle: 'Minibus 26 places', price: '45 000 FCFA' }
      ],
      note: 'Aller-retour : +50% du tarif aller simple'
    },
    {
      icon: TruckIcon,
      title: 'Mise à disposition Dakar',
      description: 'Flexibilité maximale dans la capitale',
      basePrice: '8 000',
      features: [
        'Tarif horaire flexible',
        'Chauffeur dédié',
        'Planning adaptable',
        'Connaissance parfaite de Dakar'
      ],
      pricing: [
        { vehicle: 'Berline', price: '10 000 FCFA/h' },
        { vehicle: 'SUV', price: '12 000 FCFA/h' },
        { vehicle: 'Toyota 9 places', price: '15 000 FCFA/h' },
        { vehicle: 'Minibus 26 places', price: '25 000 FCFA/h' }
      ],
      note: 'Minimum 2 heures - Tarif réduit dès 3h pour berline : 8 000 FCFA/h'
    },
    {
      icon: MapPinIcon,
      title: 'Déplacements Régions',
      description: 'Découvrez le Sénégal avec nos guides',
      basePrice: 'Sur devis',
      features: [
        'Chauffeurs-guides expérimentés',
        'Itinéraires personnalisés',
        'Connaissance culturelle',
        'Véhicules adaptés longs trajets'
      ],
      pricing: [
        { vehicle: 'Tous véhicules', price: 'Devis personnalisé' },
        { vehicle: 'Carburant', price: 'À la charge du client' }
      ],
      note: 'Tarifs variables selon destination et durée'
    }
  ];

  return (
    <section id="tarifs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-darkGray mb-4">
            Nos Tarifs Transparents
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Des prix clairs et compétitifs pour tous vos déplacements au Sénégal
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tarifs"
              className="inline-flex items-center px-6 py-3 bg-primary-orange text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all"
            >
              <ArrowDownTrayIcon className="mr-2 h-5 w-5" />
              Télécharger la grille tarifaire
            </Link>
            <Link
              to="/booking"
              className="inline-flex items-center px-6 py-3 border-2 border-primary-darkGray text-primary-darkGray font-semibold rounded-lg hover:bg-primary-darkGray hover:text-white transition-all"
            >
              Obtenir un devis gratuit
            </Link>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isPopular = index === 0; // Transfert aéroport le plus populaire

            return (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${isPopular ? 'border-primary-orange transform scale-105' : 'border-gray-200'}`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-orange text-white px-6 py-2 rounded-full text-sm font-semibold">
                      ⭐ Plus demandé
                    </span>
                  </div>
                )}

                <div className="p-8">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isPopular ? 'bg-primary-orange' : 'bg-gray-100'}`}>
                      <IconComponent className={`h-8 w-8 ${isPopular ? 'text-white' : 'text-primary-orange'}`} />
                    </div>
                    <h3 className="text-xl font-bold text-primary-darkGray mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-primary-orange">
                        {service.basePrice}
                      </span>
                      {service.basePrice !== 'Sur devis' && (
                        <span className="text-gray-500"> FCFA</span>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircleIcon className="text-green-500 mr-3 flex-shrink-0 h-5 w-5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing Details */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-primary-darkGray mb-3">Détail des tarifs :</h4>
                    <div className="space-y-2">
                      {service.pricing.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-600">{item.vehicle}</span>
                          <span className="font-medium text-primary-darkGray">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Note */}
                  <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-800">
                      💡 {service.note}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <Link
                    to="/booking"
                    className={`block w-full text-center py-3 rounded-lg font-semibold transition-all ${isPopular ? 'bg-primary-orange text-white hover:bg-opacity-90' : 'border-2 border-primary-orange text-primary-orange hover:bg-primary-orange hover:text-white'}`}
                  >
                    Réserver maintenant
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="bg-gray-50 rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-primary-darkGray mb-4">
                ✅ Inclus dans tous nos tarifs
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Chauffeur professionnel expérimenté</li>
                <li>• Véhicule climatisé et entretenu</li>
                <li>• Assurance tous risques</li>
                <li>• Carburant inclus (sauf régions)</li>
                <li>• Service client 24h/24</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary-darkGray mb-4">
                📋 Conditions générales
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Réservation 24h à l\'avance recommandée</li>
                <li>• Paiement espèces, virement, mobile money</li>
                <li>• Devis gratuit et sans engagement</li>
                <li>• Annulation gratuite jusqu\'à 12h avant</li>
                <li>• Tarifs sujets à révision selon période</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
