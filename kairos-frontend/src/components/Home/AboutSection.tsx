import React from 'react';
import { motion } from 'framer-motion';
import { HeartIcon, ShieldCheckIcon, ClockIcon, StarIcon, UsersIcon, MapPinIcon, TruckIcon, ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const AboutSection: React.FC = () => {
  const values = [
    {
      icon: ShieldCheckIcon,
      title: 'Sécurité',
      description: 'Chauffeurs expérimentés et véhicules régulièrement entretenus',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: ClockIcon,
      title: 'Ponctualité',
      description: 'Nous respectons vos horaires et garantissons la ponctualité',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: HeartIcon,
      title: 'Service Client',
      description: 'Une approche personnalisée pour chaque client',
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      icon: StarIcon,
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans tous nos services',
      gradient: 'from-primary-orange-500 to-primary-orange-600'
    }
  ];

  const stats = [
    { number: '5+', label: 'Années d\'expérience', icon: ClockIcon },
    { number: '1000+', label: 'Clients satisfaits', icon: UsersIcon },
    { number: '15+', label: 'Véhicules modernes', icon: TruckIcon },
    { number: '24/7', label: 'Service disponible', icon: CheckCircleIcon }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const itemTransition = {
    duration: 0.6
  };

  return (
    <section id="about" className="py-24 bg-primary-neutral-0 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-primary-gray-500/5 rounded-full blur-2xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Left Column - Premium Content */}
          <motion.div variants={itemVariants} transition={itemTransition}>
            <motion.div 
              className="inline-flex items-center px-4 py-2 bg-primary-orange-50 text-primary-orange-600 rounded-full text-sm font-semibold mb-6"
              variants={itemVariants}
              transition={itemTransition}
            >
              ✨ Notre Histoire
            </motion.div>
            
            <motion.h2 
              className="text-5xl font-display font-bold text-primary-gray-700 mb-8 leading-tight"
              variants={itemVariants}
              transition={itemTransition}
            >
              À Propos de <span className="bg-gradient-to-r from-primary-orange-500 to-primary-orange-600 bg-clip-text text-transparent">KAIROS</span><br />Car Services
            </motion.h2>
            
            <motion.div className="space-y-6 text-primary-gray-600 leading-relaxed" variants={itemVariants} transition={itemTransition}>
              <p className="text-lg">
                Fondée en 2019, <span className="text-primary-orange-500 font-semibold">KAIROS Car Services</span> est 
                votre partenaire de confiance pour tous vos déplacements au Sénégal.
              </p>
              <p className="text-base">
                Notre mission est simple : vous offrir un service de transport d\'exception qui allie 
                <span className="font-semibold text-primary-gray-700"> confort, sécurité et ponctualité</span>. Que ce soit pour 
                un transfert aéroport, une mise à disposition dans Dakar ou un déplacement vers les régions, 
                nous mettons notre expertise à votre service.
              </p>
              <p className="text-base">
                Avec une flotte de <span className="text-primary-orange-500 font-semibold">véhicules modernes</span> et 
                une équipe de <span className="text-primary-orange-500 font-semibold">chauffeurs professionnels</span>, 
                nous garantissons une expérience de transport exceptionnelle à chaque trajet.
              </p>
            </motion.div>

            {/* Premium CTA Buttons */}
            <motion.div className="flex flex-col sm:flex-row gap-4 mt-10" variants={itemVariants} transition={itemTransition}>
              <motion.button
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-orange-500 to-primary-orange-600 text-primary-neutral-0 font-semibold rounded-xl shadow-glow hover:shadow-medium transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Nous contacter</span>
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-orange-600 to-primary-orange-700"
                  initial={{ x: '100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              
              <motion.a
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-gray-700 text-primary-gray-700 font-semibold rounded-xl hover:bg-primary-gray-700 hover:text-primary-neutral-0 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                En savoir plus
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column - Premium Image with Effects */}
          <motion.div className="relative" variants={itemVariants} transition={itemTransition}>
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1551734986-8ac0218e5932?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Équipe KAIROS Car Services"
                className="w-full h-[500px] object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-gray-900/20 via-transparent to-transparent rounded-3xl"></div>
            </div>
            
            {/* Premium Floating Stats Card */}
            <motion.div 
              className="absolute -bottom-8 -left-8 glass-morphism rounded-2xl p-6 shadow-strong border border-primary-neutral-0/20"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary-orange-500 to-primary-orange-600 bg-clip-text text-transparent mb-2">100%</div>
                <p className="text-sm font-medium text-primary-gray-600">Clients satisfaits</p>
              </div>
            </motion.div>
            
            {/* Decorative Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary-orange-400 to-primary-orange-600 rounded-full opacity-10 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </motion.div>
        </motion.div>

        {/* Premium Values Section */}
        <motion.div 
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-16" variants={itemVariants} transition={itemTransition}>
            <motion.div 
              className="inline-flex items-center px-4 py-2 bg-primary-gray-100 text-primary-gray-600 rounded-full text-sm font-semibold mb-6"
              variants={itemVariants}
              transition={itemTransition}
            >
              🎯 Nos Principes
            </motion.div>
            
            <motion.h3 
              className="text-4xl font-display font-bold text-primary-gray-700 mb-6"
              variants={itemVariants}
              transition={itemTransition}
            >
              Nos Valeurs
            </motion.h3>
            
            <motion.p 
              className="text-xl text-primary-gray-600 max-w-3xl mx-auto leading-relaxed"
              variants={itemVariants}
              transition={itemTransition}
            >
              Les principes qui guident notre action quotidienne et font de nous votre partenaire de confiance
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={index}
                  className="group cursor-pointer"
                  variants={itemVariants}
                  transition={itemTransition}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className="bg-primary-neutral-0 rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-primary-gray-200/50 group-hover:border-primary-orange-200 h-full">
                    <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="text-primary-neutral-0 w-8 h-8" />
                    </div>
                    
                    <h4 className="text-xl font-bold text-primary-gray-700 mb-3 text-center">
                      {value.title}
                    </h4>
                    
                    <p className="text-primary-gray-600 leading-relaxed text-center">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Premium Stats Section */}
        <motion.div 
          className="bg-gradient-to-br from-primary-gray-700 to-primary-gray-800 rounded-3xl p-12 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}>
            </div>
          </div>
          
          <motion.div className="text-center mb-16 relative" variants={itemVariants} transition={itemTransition}>
            <motion.h3 
              className="text-4xl font-display font-bold text-primary-neutral-0 mb-6"
              variants={itemVariants}
              transition={itemTransition}
            >
              KAIROS en Chiffres
            </motion.h3>
            
            <motion.p 
              className="text-xl text-primary-neutral-200 max-w-2xl mx-auto"
              variants={itemVariants}
              transition={itemTransition}
            >
              Quelques chiffres qui témoignent de notre engagement et de votre confiance
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div 
                  key={index} 
                  className="text-center group cursor-pointer"
                  variants={itemVariants}
                  transition={itemTransition}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="glass-morphism-dark rounded-2xl p-8 hover:bg-primary-neutral-0/10 transition-all duration-300">
                    <div className="w-12 h-12 bg-primary-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-orange-500/30 transition-all duration-300">
                      <IconComponent className="text-primary-orange-500 w-6 h-6" />
                    </div>
                    
                    <motion.div 
                      className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-orange-400 to-primary-orange-500 bg-clip-text text-transparent mb-3"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {stat.number}
                    </motion.div>
                    
                    <div className="text-primary-neutral-300 text-lg font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Premium Mission Statement */}
        <motion.div 
          className="mt-24 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="bg-gradient-to-br from-primary-orange-500 via-primary-orange-600 to-primary-orange-700 rounded-3xl p-12 text-primary-neutral-0 relative overflow-hidden shadow-strong">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}>
              </div>
            </div>
            
            <motion.h3 
              className="text-4xl font-display font-bold mb-8 relative"
              variants={itemVariants}
              transition={itemTransition}
            >
              Notre Mission
            </motion.h3>
            
            <motion.p 
              className="text-xl leading-relaxed max-w-4xl mx-auto mb-12 relative opacity-95"
              variants={itemVariants}
              transition={itemTransition}
            >
              Offrir des services de transport d\'exception qui allient confort, sécurité et ponctualité, 
              tout en contribuant au développement du tourisme et des affaires au Sénégal.
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 relative">
              <motion.div className="text-center group" variants={itemVariants} transition={itemTransition}>
                <motion.div 
                  className="w-16 h-16 bg-primary-neutral-0/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-neutral-0/30 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <UsersIcon className="w-8 h-8 text-primary-neutral-0" />
                </motion.div>
                <h4 className="font-semibold text-lg mb-3">Clients au Cœur</h4>
                <p className="opacity-90 leading-relaxed">Votre satisfaction guide toutes nos décisions et actions quotidiennes</p>
              </motion.div>
              
              <motion.div className="text-center group" variants={itemVariants} transition={itemTransition}>
                <motion.div 
                  className="w-16 h-16 bg-primary-neutral-0/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-neutral-0/30 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <MapPinIcon className="w-8 h-8 text-primary-neutral-0" />
                </motion.div>
                <h4 className="font-semibold text-lg mb-3">Couverture Étendue</h4>
                <p className="opacity-90 leading-relaxed">De Dakar aux régions, nous vous accompagnons partout au Sénégal</p>
              </motion.div>
              
              <motion.div className="text-center group" variants={itemVariants} transition={itemTransition}>
                <motion.div 
                  className="w-16 h-16 bg-primary-neutral-0/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-neutral-0/30 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <StarIcon className="w-8 h-8 text-primary-neutral-0" />
                </motion.div>
                <h4 className="font-semibold text-lg mb-3">Excellence Continue</h4>
                <p className="opacity-90 leading-relaxed">Amélioration constante de nos services pour votre satisfaction</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
