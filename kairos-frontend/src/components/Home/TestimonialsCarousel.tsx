import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { StarIcon } from '@heroicons/react/24/solid';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company?: string;
  avatar: string;
  rating: number;
  comment: string;
  service: string;
}

const TestimonialsCarousel: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Amadou Diallo',
      role: 'Directeur Commercial',
      company: 'SONATEL',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      rating: 5,
      comment: 'Service exceptionnel ! Le chauffeur était à l\'heure, très professionnel et le véhicule impeccable. Je recommande vivement KAIROS pour tous vos déplacements d\'affaires.',
      service: 'Transfert Aéroport'
    },
    {
      id: 2,
      name: 'Fatou Ndiaye',
      role: 'Organisatrice d\'événements',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b412?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      rating: 5,
      comment: 'Pour notre mariage, nous avons fait appel à KAIROS. Le minibus était parfait pour transporter nos invités. Service irréprochable et tarifs très compétitifs !',
      service: 'Transport Événement'
    },
    {
      id: 3,
      name: 'Jean-Baptiste Sow',
      role: 'Touriste',
      company: 'France',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      rating: 5,
      comment: 'Excellent service durant tout mon séjour au Sénégal. Les chauffeurs connaissent parfaitement Dakar et les régions. Très rassurant pour un visiteur !',
      service: 'Mise à disposition'
    },
    {
      id: 4,
      name: 'Mame Diarra Ba',
      role: 'Consultante',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      rating: 5,
      comment: 'Ponctualité, propreté, sécurité : tout était parfait ! J\'utilise régulièrement leurs services pour mes rendez-vous clients. Très professionnels.',
      service: 'Mise à disposition Dakar'
    },
    {
      id: 5,
      name: 'Moussa Camara',
      role: 'Chef d\'entreprise',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      rating: 5,
      comment: 'Service de qualité supérieure ! Nous faisons appel à KAIROS pour tous nos déplacements d\'affaires. L\'équipe est très réactive et les tarifs transparents.',
      service: 'Transport Entreprise'
    }
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <StarIcon
        key={index}
        className={`h-5 w-5 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-primary-orange">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            Plus de 1000 clients nous font confiance pour leurs déplacements au Sénégal
          </p>
        </div>

        {/* Testimonials Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="testimonials-swiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative">
                {/* Quote Icon */}
                <ChatBubbleLeftRightIcon className="absolute top-4 right-6 h-8 w-8 text-primary-orange opacity-20" />
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                  <span className="ml-2 text-sm text-gray-600">({testimonial.rating}/5)</span>
                </div>

                {/* Comment */}
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.comment}"
                </p>

                {/* Service Tag */}
                <div className="inline-block bg-orange-50 text-primary-orange px-3 py-1 rounded-full text-xs font-medium mb-4">
                  {testimonial.service}
                </div>

                {/* Client Info */}
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-primary-darkGray">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.role}
                      {testimonial.company && (
                        <span className="text-primary-orange"> • {testimonial.company}</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-white mb-2">1000+</div>
            <p className="text-orange-100">Clients satisfaits</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">5★</div>
            <p className="text-orange-100">Note moyenne</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">24/7</div>
            <p className="text-orange-100">Service disponible</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">5 ans</div>
            <p className="text-orange-100">D\'expérience</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
