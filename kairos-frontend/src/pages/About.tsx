import React from 'react';
import { FaHeart, FaShieldAlt, FaClock, FaStar, FaUsers, FaMapMarkedAlt } from 'react-icons/fa';

const About: React.FC = () => {
  const values = [
    {
      icon: FaShieldAlt,
      title: 'Sécurité',
      description: 'La sécurité de nos clients est notre priorité absolue. Chauffeurs expérimentés et véhicules régulièrement entretenus.'
    },
    {
      icon: FaClock,
      title: 'Ponctualité',
      description: 'Nous respectons vos horaires et nous engageons à vous faire arriver à destination à l\'heure prévue.'
    },
    {
      icon: FaHeart,
      title: 'Service Client',
      description: 'Une approche personnalisée et un service client exceptionnel pour une expérience mémorable.'
    },
    {
      icon: FaStar,
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans tous nos services pour dépasser vos attentes à chaque trajet.'
    }
  ];

  const stats = [
    { number: '5+', label: 'Années d\'expérience' },
    { number: '1000+', label: 'Clients satisfaits' },
    { number: '15+', label: 'Véhicules modernes' },
    { number: '24/7', label: 'Service disponible' }
  ];

  const teamMembers = [
    {
      name: 'Amadou DIALLO',
      position: 'Fondateur & Directeur',
      description: 'Visionnaire de KAIROS Car Services avec 10 ans d\'expérience dans le transport.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Fatou NDIAYE',
      position: 'Responsable Opérations',
      description: 'Gère la coordination de notre flotte et assure la qualité de nos services.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b412?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Mamadou FALL',
      position: 'Chef Chauffeur',
      description: 'Supervise notre équipe de chauffeurs professionnels et assure leur formation.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-darkGray to-gray-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              À Propos de KAIROS Car Services
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Votre partenaire de confiance pour tous vos déplacements au Sénégal. 
              Nous mettons notre expertise au service de votre confort et de votre sécurité.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary-darkGray mb-6">
                Notre Histoire
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Fondée en 2019, KAIROS Car Services est née de la vision de fournir des services 
                  de transport d'excellence au Sénégal. Notre fondateur, fort de son expérience 
                  dans le secteur du transport, a identifié le besoin d'une entreprise offrant 
                  à la fois professionnalisme, ponctualité et sécurité.
                </p>
                <p>
                  Depuis nos débuts, nous avons grandi pour devenir l'une des références du 
                  transport avec chauffeur dans la région de Dakar et au-delà. Notre succès 
                  repose sur une équipe dévouée et une flotte de véhicules modernes 
                  régulièrement entretenus.
                </p>
                <p>
                  Aujourd'hui, KAIROS Car Services accompagne quotidiennement des particuliers, 
                  des entreprises et des touristes dans leurs déplacements, en offrant 
                  un service personnalisé adapté aux besoins de chacun.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Transport au Sénégal"
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute inset-0 bg-primary-orange bg-opacity-10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary-darkGray mb-4">
              Nos Valeurs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Les principes qui guident notre action quotidienne et notre engagement envers nos clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-primary-orange bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="text-primary-orange text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-darkGray mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-primary-darkGray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              KAIROS en Chiffres
            </h2>
            <p className="text-xl text-gray-300">
              Quelques chiffres qui témoignent de notre engagement et de notre croissance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary-orange mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary-darkGray mb-4">
              Notre Équipe
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des professionnels passionnés dédiés à votre satisfaction et à votre sécurité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg"
                  />
                  <div className="absolute inset-0 w-48 h-48 rounded-full mx-auto bg-primary-orange bg-opacity-10"></div>
                </div>
                <h3 className="text-xl font-bold text-primary-darkGray mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-orange font-medium mb-4">
                  {member.position}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-r from-primary-orange to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Notre Mission</h2>
          <p className="text-xl leading-relaxed mb-8">
            Offrir des services de transport d'exception qui allient confort, sécurité et ponctualité, 
            tout en contribuant au développement du tourisme et des affaires au Sénégal. 
            Nous nous engageons à dépasser les attentes de nos clients à travers un service personnalisé 
            et une attention particulière aux détails.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <FaUsers className="text-4xl mx-auto mb-4 opacity-90" />
              <h3 className="font-semibold text-lg mb-2">Clients au Cœur</h3>
              <p className="opacity-90">Votre satisfaction guide toutes nos décisions</p>
            </div>
            <div className="text-center">
              <FaMapMarkedAlt className="text-4xl mx-auto mb-4 opacity-90" />
              <h3 className="font-semibold text-lg mb-2">Couverture Étendue</h3>
              <p className="opacity-90">De Dakar aux régions, nous vous accompagnons partout</p>
            </div>
            <div className="text-center">
              <FaStar className="text-4xl mx-auto mb-4 opacity-90" />
              <h3 className="font-semibold text-lg mb-2">Excellence Continue</h3>
              <p className="opacity-90">Amélioration constante de nos services et prestations</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary-darkGray mb-4">
            Prêt à voyager avec KAIROS ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Découvrez pourquoi nos clients nous font confiance pour leurs déplacements au Sénégal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/booking"
              className="inline-flex items-center px-8 py-3 bg-primary-orange text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all"
            >
              Réserver maintenant
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 border-2 border-primary-darkGray text-primary-darkGray font-semibold rounded-lg hover:bg-primary-darkGray hover:text-white transition-all"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;