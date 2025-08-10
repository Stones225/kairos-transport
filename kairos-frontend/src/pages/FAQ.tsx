import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaSearch, FaQuestionCircle } from 'react-icons/fa';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: 'Comment puis-je réserver un véhicule ?',
      answer: 'Vous pouvez réserver un véhicule de plusieurs façons : via notre formulaire de réservation en ligne, par téléphone au +221 XX XXX XX XX, ou par WhatsApp. Il vous suffit de préciser vos besoins (type de véhicule, date, heure, destination) et nous confirmerons votre réservation rapidement.',
      category: 'réservations'
    },
    {
      id: 2,
      question: 'Quels sont vos tarifs pour un transfert aéroport ?',
      answer: 'Nos tarifs pour les transferts aéroport sont : Berline (25 000 FCFA), SUV (30 000 FCFA), Toyota 9 places (35 000 FCFA), Minibus 26 places (45 000 FCFA). Ces tarifs sont pour un aller simple. Pour un aller-retour, ajoutez 50% du tarif aller simple.',
      category: 'tarifs'
    },
    {
      id: 3,
      question: 'Combien de temps à l\'avance dois-je réserver ?',
      answer: 'Nous recommandons de réserver au moins 24 heures à l\'avance pour garantir la disponibilité. Cependant, nous acceptons aussi les réservations de dernière minute sous réserve de disponibilité de nos véhicules.',
      category: 'réservations'
    },
    {
      id: 4,
      question: 'Vos chauffeurs parlent-ils français et anglais ?',
      answer: 'Oui, tous nos chauffeurs parlent français couramment. Beaucoup parlent également anglais et d\'autres langues locales. Nous pouvons organiser un chauffeur parlant une langue spécifique sur demande.',
      category: 'services'
    },
    {
      id: 5,
      question: 'Que se passe-t-il si mon vol est retardé ?',
      answer: 'Nous surveillons les horaires de vol en temps réel. Si votre vol est retardé, nous ajustons automatiquement l\'heure de prise en charge sans frais supplémentaires. Notre service client vous tiendra informé des ajustements.',
      category: 'aéroport'
    },
    {
      id: 6,
      question: 'Puis-je annuler ou modifier ma réservation ?',
      answer: 'Oui, vous pouvez annuler ou modifier votre réservation. Pour les annulations effectuées plus de 24h avant le départ, aucun frais n\'est appliqué. Pour les annulations tardives (moins de 24h), des frais peuvent s\'appliquer selon notre politique d\'annulation.',
      category: 'annulation'
    },
    {
      id: 7,
      question: 'Acceptez-vous les paiements par carte bancaire ?',
      answer: 'Nous acceptons plusieurs modes de paiement : espèces, virement bancaire, Wave, Orange Money. Le paiement par carte bancaire sera bientôt disponible. Nous offrons aussi la possibilité de paiement échelonné pour les longs trajets.',
      category: 'paiement'
    },
    {
      id: 8,
      question: 'Vos véhicules sont-ils climatisés ?',
      answer: 'Oui, tous nos véhicules sont équipés de la climatisation et sont régulièrement entretenus. Nous nous assurons que nos véhicules sont propres, confortables et en parfait état de fonctionnement.',
      category: 'véhicules'
    },
    {
      id: 9,
      question: 'Proposez-vous des services pour les groupes ?',
      answer: 'Absolument ! Nous avons des minibus pouvant accueillir jusqu\'à 26 personnes. Nous proposons des tarifs de groupe avantageux et pouvons organiser plusieurs véhicules pour les grands groupes. Contactez-nous pour un devis personnalisé.',
      category: 'services'
    },
    {
      id: 10,
      question: 'Couvrez-vous toutes les régions du Sénégal ?',
      answer: 'Oui, nous couvrons tout le Sénégal. Pour les déplacements en région, nous établissons des devis personnalisés en fonction de la destination, de la durée et du type de véhicule. Le carburant est à la charge du client pour les trajets de demi-journée ou journée complète.',
      category: 'régions'
    },
    {
      id: 11,
      question: 'Comment être sûr que mon chauffeur sera à l\'heure ?',
      answer: 'Nos chauffeurs sont formés à la ponctualité. Ils arrivent généralement 10-15 minutes avant l\'heure prévue. Vous recevrez les coordonnées de votre chauffeur la veille de votre trajet et il vous contactera 30 minutes avant l\'arrivée.',
      category: 'ponctualité'
    },
    {
      id: 12,
      question: 'Que faire en cas d\'urgence pendant le trajet ?',
      answer: 'Tous nos véhicules sont équipés de moyens de communication. Nos chauffeurs ont accès à notre service client 24h/24. En cas d\'urgence, contactez immédiatement notre numéro d\'urgence +221 XX XXX XX XX.',
      category: 'sécurité'
    }
  ];

  const categories = [
    { value: 'all', label: 'Toutes les catégories' },
    { value: 'réservations', label: 'Réservations' },
    { value: 'tarifs', label: 'Tarifs' },
    { value: 'services', label: 'Services' },
    { value: 'aéroport', label: 'Aéroport' },
    { value: 'paiement', label: 'Paiement' },
    { value: 'véhicules', label: 'Véhicules' },
    { value: 'annulation', label: 'Annulation' },
    { value: 'régions', label: 'Régions' },
    { value: 'ponctualité', label: 'Ponctualité' },
    { value: 'sécurité', label: 'Sécurité' }
  ];

  const filteredFAQ = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const isOpen = (id: number) => openItems.includes(id);

  return (
    <div className="pt-16">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary-darkGray to-gray-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaQuestionCircle className="text-6xl mx-auto mb-6 opacity-80" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Questions Fréquentes
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Trouvez rapidement les réponses à vos questions sur nos services de transport. 
            Si vous ne trouvez pas ce que vous cherchez, n'hésitez pas à nous contacter.
          </p>
        </div>
      </section>

      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Search */}
              <div className="relative">
                <label className="block text-sm font-medium text-primary-darkGray mb-2">
                  Rechercher une question
                </label>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    placeholder="Tapez votre recherche..."
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-primary-darkGray mb-2">
                  Filtrer par catégorie
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              {filteredFAQ.length} question{filteredFAQ.length !== 1 ? 's' : ''} trouvée{filteredFAQ.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQ.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <FaQuestionCircle className="text-gray-300 text-4xl mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">
                  Aucune question trouvée
                </h3>
                <p className="text-gray-400">
                  Essayez de modifier vos critères de recherche ou contactez-nous directement.
                </p>
              </div>
            ) : (
              filteredFAQ.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-primary-darkGray pr-4">
                        {item.question}
                      </h3>
                      <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-primary-orange bg-opacity-10 text-primary-orange rounded-full capitalize">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex-shrink-0">
                      {isOpen(item.id) ? (
                        <FaChevronUp className="text-primary-orange" />
                      ) : (
                        <FaChevronDown className="text-gray-400" />
                      )}
                    </div>
                  </button>
                  
                  {isOpen(item.id) && (
                    <div className="px-6 pb-6">
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-gray-600 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 bg-primary-orange text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Vous ne trouvez pas votre réponse ?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Notre équipe est là pour vous aider ! Contactez-nous et nous répondrons à toutes vos questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-white text-primary-orange font-semibold rounded-lg hover:bg-gray-100 transition-all"
              >
                Nous contacter
              </a>
              <a
                href="https://wa.me/221XXXXXXXXX"
                className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-orange transition-all"
              >
                WhatsApp Direct
              </a>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                💡 Conseil pour les réservations
              </h3>
              <p className="text-blue-700">
                Réservez vos trajets à l'avance pour bénéficier de nos meilleurs tarifs et garantir la disponibilité de votre véhicule préféré.
              </p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-3">
                📱 Service client 24/7
              </h3>
              <p className="text-green-700">
                Notre service d'urgence est disponible 24h/24 et 7j/7. N'hésitez pas à nous appeler en cas de besoin urgent de transport.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;