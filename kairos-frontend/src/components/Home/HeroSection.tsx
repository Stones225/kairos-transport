import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClockIcon, ShieldCheckIcon, MapPinIcon, StarIcon, ArrowRightIcon, PlayIcon } from '@heroicons/react/24/outline';

const HeroSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
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

  const features = [
    {
      icon: ClockIcon,
      text: 'Disponible 24h/24',
      delay: 0.3
    },
    {
      icon: ShieldCheckIcon,
      text: 'Service sécurisé',
      delay: 0.4
    },
    {
      icon: MapPinIcon,
      text: 'Couverture nationale',
      delay: 0.5
    },
    {
      icon: StarIcon,
      text: 'Chauffeurs expérimentés',
      delay: 0.6
    }
  ];

  const stats = [
    { number: '5+', label: 'Années d\'expérience' },
    { number: '100%', label: 'Clients satisfaits' },
    { number: '24/7', label: 'Service disponible' },
    { number: '15+', label: 'Véhicules modernes' }
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Premium Background with Gradient Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2535&q=80")'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-gray-900/85 via-primary-gray-800/80 to-primary-gray-700/75"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary-gray-900/50 via-transparent to-transparent"></div>
      </div>
      
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Premium Content */}
          <motion.div className="text-primary-neutral-0 space-y-8" variants={itemVariants} transition={itemTransition}>
            <div className="space-y-6">
              <motion.div 
                className="inline-flex items-center px-4 py-2 glass-morphism rounded-full text-sm font-medium text-primary-gray-700"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                ✨ Transport Premium au Sénégal
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-display font-bold leading-tight"
                variants={itemVariants}
                transition={itemTransition}
              >
                Votre <span className="bg-gradient-to-r from-primary-orange-500 to-primary-orange-600 bg-clip-text text-transparent">Partenaire</span><br />de Transport
              </motion.h1>
              
              <motion.p 
                className="text-xl text-primary-neutral-200 leading-relaxed max-w-lg"
                variants={itemVariants}
                transition={itemTransition}
              >
                KAIROS Car Services vous accompagne avec élégance, sécurité et ponctualité 
                pour tous vos déplacements à Dakar et dans les régions du Sénégal.
              </motion.p>
            </div>

            {/* Premium Features Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={itemVariants}
              transition={itemTransition}
            >
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: feature.delay, duration: 0.5 }}
                  >
                    <div className="w-10 h-10 bg-primary-orange-500/20 rounded-xl flex items-center justify-center group-hover:bg-primary-orange-500/30 transition-all duration-300">
                      <IconComponent className="text-primary-orange-500 w-5 h-5" />
                    </div>
                    <span className="text-lg font-medium text-primary-neutral-100">{feature.text}</span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Premium CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              variants={itemVariants}
              transition={itemTransition}
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/booking"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-orange-500 to-primary-orange-600 text-primary-neutral-0 font-semibold rounded-xl shadow-glow hover:shadow-medium transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Réserver maintenant</span>
                    <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-orange-600 to-primary-orange-700"
                    initial={{ x: '100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <button className="group inline-flex items-center justify-center px-8 py-4 glass-morphism text-primary-neutral-0 font-semibold rounded-xl border border-primary-neutral-0/20 hover:border-primary-orange-500/50 transition-all duration-300">
                  <PlayIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Découvrir nos services
                </button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Premium Stats Card */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="glass-morphism rounded-3xl p-8 shadow-strong border border-primary-neutral-0/20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <h2 className="text-2xl font-display font-bold text-primary-gray-700 mb-6 text-center">
                  Pourquoi choisir KAIROS ?
                </h2>
                
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center group cursor-pointer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-3xl font-bold bg-gradient-to-r from-primary-orange-500 to-primary-orange-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                        {stat.number}
                      </div>
                      <p className="text-primary-gray-600 font-medium text-sm">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  className="mt-8 p-6 bg-gradient-to-r from-primary-orange-50 to-primary-orange-100 rounded-2xl border border-primary-orange-200/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                >
                  <p className="text-primary-gray-700 text-center font-semibold">
                    <span className="text-2xl">🛫</span><br />
                    Transfert aéroport à partir de <span className="text-primary-orange-600 font-bold text-lg">25 000 FCFA</span>
                  </p>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary-orange-400 to-primary-orange-600 rounded-full opacity-20 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Premium Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-primary-neutral-0/70 rounded-full flex justify-center cursor-pointer group"
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          onClick={() => {
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <motion.div 
            className="w-1 h-3 bg-primary-neutral-0 rounded-full mt-2 group-hover:bg-primary-orange-500 transition-colors"
            animate={{ y: [0, 3, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
