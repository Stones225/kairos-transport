import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { UsersIcon, BriefcaseIcon, AdjustmentsHorizontalIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import LazyImage from '../Common/LazyImage';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Vehicle {
  id: number;
  name: string;
  capacity: string;
  image: string;
  price: string;
  features: string[];
  description: string;
}

const VehiclesCarousel: React.FC = () => {
  const vehicles: Vehicle[] = [
    {
      id: 1,
      name: 'Berline Executive',
      capacity: '4 passagers',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: '25 000 FCFA',
      features: ['Climatisation', 'Sièges cuir', 'Wi-Fi', 'Eau fraîche'],
      description: 'Parfait pour vos déplacements professionnels et transferts aéroport'
    },
    {
      id: 2,
      name: 'SUV Premium',
      capacity: '6 passagers',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: '30 000 FCFA',
      features: ['Grand coffre', 'Climatisation', 'Confort famille', 'Sécurité renforcée'],
      description: 'Idéal pour les familles et groupes avec bagages'
    },
    {
      id: 3,
      name: 'Toyota 9 Places',
      capacity: '9 passagers',
      image: 'https://images.unsplash.com/photo-1562141961-4b6bed21db70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: '35 000 FCFA',
      features: ['Espace généreux', 'Climatisation', 'Confort groupe', 'Multiple bagages'],
      description: 'Solution parfaite pour les événements familiaux et groupes'
    },
    {
      id: 4,
      name: 'Minibus 26 Places',
      capacity: '26 passagers',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: '45 000 FCFA',
      features: ['Transport collectif', 'Climatisation', 'Confort optimal', 'Sécurité maximale'],
      description: 'Idéal pour événements, excursions et transport collectif'
    }
  ];

  return (
    <section id="vehicles" className="py-20 bg-primary-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-gray-700 mb-4">
            Notre Flotte de Véhicules
          </h2>
          <p className="text-xl text-primary-gray-600 max-w-2xl mx-auto">
            Des véhicules modernes et bien entretenus pour répondre à tous vos besoins de transport
          </p>
        </div>

        {/* Vehicles Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="vehicles-swiper"
        >
          {vehicles.map((vehicle) => (
            <SwiperSlide key={vehicle.id}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Vehicle Image */}
                <div className="relative h-48 overflow-hidden">
                  <LazyImage
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    width={400}
                    height={192}
                    effect="blur"
                  />
                  <div className="absolute top-4 right-4 bg-primary-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {vehicle.price}
                  </div>
                </div>

                {/* Vehicle Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-primary-gray-700">
                      {vehicle.name}
                    </h3>
                    <div className="flex items-center text-primary-orange-500">
                      <UsersIcon className="mr-1 w-4 h-4" />
                      <span className="text-sm font-medium">{vehicle.capacity}</span>
                    </div>
                  </div>

                  <p className="text-primary-gray-600 mb-4 leading-relaxed">
                    {vehicle.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {vehicle.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-primary-gray-600">
                        <div className="w-2 h-2 bg-primary-orange-500 rounded-full mr-2 flex-shrink-0"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button className="w-full bg-primary-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-primary-orange-600 transition-all">
                    Réserver ce véhicule
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <ShieldCheckIcon className="text-primary-orange-500 w-8 h-8 mx-auto mb-3" />
            <h3 className="font-semibold text-primary-gray-700 mb-2">Sécurité</h3>
            <p className="text-primary-gray-600 text-sm">Véhicules entretenus et assurés</p>
          </div>
          <div className="text-center">
            <AdjustmentsHorizontalIcon className="text-primary-orange-500 w-8 h-8 mx-auto mb-3" />
            <h3 className="font-semibold text-primary-gray-700 mb-2">Confort</h3>
            <p className="text-primary-gray-600 text-sm">Climatisation dans tous nos véhicules</p>
          </div>
          <div className="text-center">
            <UsersIcon className="text-primary-orange-500 w-8 h-8 mx-auto mb-3" />
            <h3 className="font-semibold text-primary-gray-700 mb-2">Capacité</h3>
            <p className="text-primary-gray-600 text-sm">De 4 à 26 places selon vos besoins</p>
          </div>
          <div className="text-center">
            <BriefcaseIcon className="text-primary-orange-500 w-8 h-8 mx-auto mb-3" />
            <h3 className="font-semibold text-primary-gray-700 mb-2">Bagages</h3>
            <p className="text-primary-gray-600 text-sm">Espace suffisant pour tous vos effets</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehiclesCarousel;