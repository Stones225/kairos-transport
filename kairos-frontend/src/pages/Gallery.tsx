import React, { useState } from 'react';
import { FaCar, FaUsers, FaStar, FaEye, FaTimes } from 'react-icons/fa';

interface VehicleImage {
  id: number;
  src: string;
  alt: string;
  category: 'berline' | 'suv' | 'toyota-9' | 'minibus' | 'service';
  title: string;
  description: string;
  specifications?: {
    capacity: string;
    features: string[];
  };
}

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<VehicleImage | null>(null);

  const categories = [
    { value: 'all', label: 'Tous', icon: FaCar },
    { value: 'berline', label: 'Berlines', icon: FaCar },
    { value: 'suv', label: 'SUV', icon: FaCar },
    { value: 'toyota-9', label: 'Toyota 9 places', icon: FaUsers },
    { value: 'minibus', label: 'Minibus', icon: FaUsers },
    { value: 'service', label: 'Services', icon: FaStar },
  ];

  const images: VehicleImage[] = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1502877338535-766e7375c5e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Berline de luxe',
      category: 'berline',
      title: 'Berline Executive',
      description: 'Véhicule confortable pour vos déplacements professionnels',
      specifications: {
        capacity: '4 passagers',
        features: ['Climatisation', 'Sièges cuir', 'Wi-Fi', 'Eau fraîche']
      }
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1519641643602-7ff500b74923?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'SUV moderne',
      category: 'suv',
      title: 'SUV Premium',
      description: 'Parfait pour les familles et groupes avec bagages',
      specifications: {
        capacity: '6 passagers',
        features: ['Climatisation', 'Grand coffre', 'Sièges confort', 'USB']
      }
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Toyota 9 places',
      category: 'toyota-9',
      title: 'Toyota Hiace',
      description: 'Idéal pour les groupes et événements familiaux',
      specifications: {
        capacity: '9 passagers',
        features: ['Climatisation', 'Espace généreux', 'Confort groupe', 'Bagages']
      }
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Minibus 26 places',
      category: 'minibus',
      title: 'Minibus Transport',
      description: 'Solutions pour grands groupes et événements',
      specifications: {
        capacity: '26 passagers',
        features: ['Climatisation', 'Transport collectif', 'Confort optimal', 'Sécurité']
      }
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Service aéroport',
      category: 'service',
      title: 'Transfert Aéroport',
      description: 'Service ponctuel vers l\'aéroport AIBD',
      specifications: {
        capacity: 'Tous véhicules',
        features: ['Suivi vols', 'Accueil personnalisé', 'Ponctualité', '24h/24']
      }
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Mise à disposition',
      category: 'service',
      title: 'Mise à Disposition',
      description: 'Chauffeur et véhicule à votre service',
      specifications: {
        capacity: 'Flexible',
        features: ['Tarif horaire', 'Planning libre', 'Chauffeur dédié', 'Confort']
      }
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Voyage région',
      category: 'service',
      title: 'Déplacement Région',
      description: 'Découvrez les régions du Sénégal',
      specifications: {
        capacity: 'Sur mesure',
        features: ['Guide local', 'Itinéraire personnalisé', 'Culture', 'Sécurité']
      }
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1502877338535-766e7375c5e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Berline standard',
      category: 'berline',
      title: 'Berline Confort',
      description: 'Transport quotidien de qualité',
      specifications: {
        capacity: '4 passagers',
        features: ['Climatisation', 'Confort standard', 'Propreté', 'Fiabilité']
      }
    },
  ];

  const filteredImages = images.filter(image => 
    selectedCategory === 'all' || image.category === selectedCategory
  );

  const openLightbox = (image: VehicleImage) => {
    setLightboxImage(image);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <div className="pt-16">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary-darkGray to-gray-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Notre Flotte & Services
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Découvrez notre flotte de véhicules modernes et nos services de qualité. 
            Tous nos véhicules sont régulièrement entretenus et nos chauffeurs sont professionnels.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                    selectedCategory === category.value
                      ? 'bg-primary-orange text-white shadow-lg'
                      : 'bg-gray-100 text-primary-darkGray hover:bg-gray-200'
                  }`}
                >
                  <IconComponent className="mr-2" />
                  {category.label}
                </button>
              );
            })}
          </div>
          
          <div className="text-center mt-6 text-gray-600">
            {filteredImages.length} {filteredImages.length === 1 ? 'image' : 'images'} 
            {selectedCategory !== 'all' && ` dans la catégorie "${categories.find(c => c.value === selectedCategory)?.label}"`}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <FaCar className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-500">Aucune image dans cette catégorie</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                      <button
                        onClick={() => openLightbox(image)}
                        className="opacity-0 hover:opacity-100 bg-primary-orange text-white p-3 rounded-full transform scale-75 hover:scale-100 transition-all duration-300"
                      >
                        <FaEye className="text-lg" />
                      </button>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-primary-orange text-white px-2 py-1 text-xs font-medium rounded-full capitalize">
                        {image.category === 'toyota-9' ? 'Toyota' : image.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-primary-darkGray mb-2">
                      {image.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {image.description}
                    </p>
                    
                    {image.specifications && (
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <FaUsers className="text-primary-orange mr-2 flex-shrink-0" />
                          <span className="font-medium">{image.specifications.capacity}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {image.specifications.features.slice(0, 2).map((feature, index) => (
                            <span
                              key={index}
                              className="inline-block bg-gray-100 text-gray-600 px-2 py-1 text-xs rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                          {image.specifications.features.length > 2 && (
                            <span className="inline-block bg-primary-orange bg-opacity-10 text-primary-orange px-2 py-1 text-xs rounded-full">
                              +{image.specifications.features.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <button
                      onClick={() => openLightbox(image)}
                      className="mt-4 w-full bg-primary-orange text-white py-2 rounded-md hover:bg-opacity-90 transition-all font-medium"
                    >
                      Voir les détails
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-full overflow-y-auto">
            <div className="relative">
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-primary-red text-white p-2 rounded-full hover:bg-opacity-90 transition-all z-10"
              >
                <FaTimes />
              </button>
              
              <img
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                className="w-full h-64 md:h-96 object-cover rounded-t-xl"
              />
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-primary-darkGray">
                    {lightboxImage.title}
                  </h2>
                  <span className="bg-primary-orange text-white px-3 py-1 text-sm font-medium rounded-full capitalize">
                    {lightboxImage.category === 'toyota-9' ? 'Toyota 9 places' : lightboxImage.category}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {lightboxImage.description}
                </p>
                
                {lightboxImage.specifications && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-primary-darkGray mb-3 flex items-center">
                        <FaUsers className="text-primary-orange mr-2" />
                        Capacité
                      </h3>
                      <p className="text-gray-600">{lightboxImage.specifications.capacity}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-primary-darkGray mb-3 flex items-center">
                        <FaStar className="text-primary-orange mr-2" />
                        Équipements
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {lightboxImage.specifications.features.map((feature, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-600 px-3 py-1 text-sm rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/booking"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary-orange text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all"
                  >
                    Réserver ce véhicule
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary-darkGray text-primary-darkGray font-semibold rounded-lg hover:bg-primary-darkGray hover:text-white transition-all"
                  >
                    Demander plus d'infos
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-primary-orange text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à voyager avec style ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Choisissez le véhicule qui correspond à vos besoins et réservez dès maintenant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/booking"
              className="inline-flex items-center px-8 py-3 bg-white text-primary-orange font-semibold rounded-lg hover:bg-gray-100 transition-all"
            >
              Faire une réservation
            </a>
            <a
              href="/tarifs"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-orange transition-all"
            >
              Voir les tarifs
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;