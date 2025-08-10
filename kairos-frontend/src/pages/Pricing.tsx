import React from 'react';
import { FaPlane, FaCar, FaMapMarkedAlt, FaDownload, FaPrint, FaInfoCircle } from 'react-icons/fa';

const Pricing: React.FC = () => {
  const pricingData = [
    {
      category: 'Transfert Aéroport',
      icon: FaPlane,
      description: 'Depuis/vers l\'aéroport AIBD',
      services: [
        {
          service: 'Aéroport Blaise Diagne',
          vehicles: [
            { type: 'Berline (4 places)', price: '25 000', unit: 'FCFA (aller simple)' },
            { type: 'SUV (6 places)', price: '30 000', unit: 'FCFA (aller simple)' },
            { type: 'Toyota 9 places', price: '35 000', unit: 'FCFA (aller simple)' },
            { type: 'Minibus (26 places)', price: '45 000', unit: 'FCFA (aller simple)' }
          ]
        }
      ],
      note: 'Aller-retour : +50% du tarif aller simple'
    },
    {
      category: 'Mise à disposition Dakar',
      icon: FaCar,
      description: 'Service flexible dans la capitale',
      services: [
        {
          service: 'Tarification horaire',
          vehicles: [
            { type: 'Berline (4 places)', price: '10 000', unit: 'FCFA/heure' },
            { type: 'SUV (6 places)', price: '12 000', unit: 'FCFA/heure' },
            { type: 'Toyota 9 places', price: '15 000', unit: 'FCFA/heure' },
            { type: 'Minibus (26 places)', price: '25 000', unit: 'FCFA/heure' }
          ]
        }
      ],
      note: 'Minimum 2 heures - Tarif réduit : 8 000 FCFA/heure à partir de 3h pour berline'
    },
    {
      category: 'Mise à disposition Régions',
      icon: FaMapMarkedAlt,
      description: 'Déplacements sur mesure',
      services: [
        {
          service: 'Tous types de véhicules',
          vehicles: [
            { type: 'Devis personnalisé', price: 'Variable', unit: '' },
            { type: 'Carburant', price: 'À la charge du client', unit: '' }
          ]
        }
      ],
      note: 'Tarifs variables selon destination et durée du trajet'
    }
  ];

  const additionalServices = [
    'Service disponible 24h/24 et 7j/7',
    'Accueil personnalisé à l\'aéroport',
    'Suivi des vols en temps réel',
    'Véhicules climatisés et entretenus',
    'Chauffeurs expérimentés et professionnels',
    'Assurance tous risques incluse'
  ];

  const handleDownloadPDF = () => {
    console.log('Téléchargement PDF des tarifs');
    // TODO: Implement PDF download
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-16">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary-darkGray to-gray-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tarifs et Formules
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed mb-8">
              Découvrez nos tarifs transparents et compétitifs pour tous vos déplacements au Sénégal.
            </p>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleDownloadPDF}
                className="inline-flex items-center px-6 py-3 bg-primary-orange text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all"
              >
                <FaDownload className="mr-2" />
                Télécharger PDF
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-darkGray transition-all"
              >
                <FaPrint className="mr-2" />
                Imprimer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tables */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {pricingData.map((category, categoryIndex) => {
              const IconComponent = category.icon;
              
              return (
                <div key={categoryIndex} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  {/* Category Header */}
                  <div className="bg-primary-orange text-white p-6">
                    <div className="flex items-center mb-4">
                      <IconComponent className="text-3xl mr-4" />
                      <div>
                        <h2 className="text-2xl font-bold">{category.category}</h2>
                        <p className="opacity-90">{category.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Content */}
                  <div className="p-6">
                    {category.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="mb-8 last:mb-0">
                        <h3 className="text-xl font-semibold text-primary-darkGray mb-6">
                          {service.service}
                        </h3>
                        
                        {/* Pricing Table */}
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-primary-darkGray">
                                  Type de Véhicule
                                </th>
                                <th className="border border-gray-200 px-4 py-3 text-right font-semibold text-primary-darkGray">
                                  Tarif
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {service.vehicles.map((vehicle, vehicleIndex) => (
                                <tr key={vehicleIndex} className="hover:bg-gray-50 transition-colors">
                                  <td className="border border-gray-200 px-4 py-3 text-primary-darkGray">
                                    {vehicle.type}
                                  </td>
                                  <td className="border border-gray-200 px-4 py-3 text-right">
                                    <span className="font-bold text-primary-orange text-lg">
                                      {vehicle.price}
                                    </span>
                                    {vehicle.unit && (
                                      <span className="text-gray-600 ml-1">
                                        {vehicle.unit}
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}

                    {/* Category Note */}
                    {category.note && (
                      <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                        <div className="flex items-start">
                          <FaInfoCircle className="text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                          <p className="text-blue-800 font-medium">
                            {category.note}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-darkGray mb-4">
              Services Inclus
            </h2>
            <p className="text-lg text-gray-600">
              Tous nos tarifs incluent ces services de qualité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {additionalServices.map((service, index) => (
              <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                <div className="w-3 h-3 bg-primary-orange rounded-full mr-4 flex-shrink-0"></div>
                <span className="text-primary-darkGray">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 bg-primary-darkGray text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Conditions Générales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary-orange">Réservations</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Réservation recommandée 24h à l'avance</li>
                <li>• Confirmation par SMS ou WhatsApp</li>
                <li>• Possibilité de réservation de dernière minute</li>
                <li>• Devis gratuit et sans engagement</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary-orange">Paiements</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Paiement en espèces ou par virement</li>
                <li>• Possibilité de paiement échelonné</li>
                <li>• Facture fournie sur demande</li>
                <li>• Tarifs sujets à révision selon période</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-orange text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Besoin d'un devis personnalisé ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Contactez-nous pour obtenir un tarif adapté à vos besoins spécifiques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/booking"
              className="inline-flex items-center px-8 py-3 bg-white text-primary-orange font-semibold rounded-lg hover:bg-gray-100 transition-all"
            >
              Faire une réservation
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-orange transition-all"
            >
              Demander un devis
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;