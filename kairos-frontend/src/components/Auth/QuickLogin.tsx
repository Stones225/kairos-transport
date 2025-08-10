import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

interface QuickLoginProps {
  onClose?: () => void;
  title?: string;
}

const QuickLogin: React.FC<QuickLoginProps> = ({ 
  onClose, 
  title = "Connexion rapide" 
}) => {
  const { login, register } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLoginMode) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.email, formData.password, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone
        });
      }
      
      if (onClose) onClose();
      
    } catch (error: any) {
      alert(`Erreur: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 max-w-md mx-auto"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600">
          {isLoginMode 
            ? "Connectez-vous pour finaliser votre réservation" 
            : "Créez un compte pour réserver votre transport"
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLoginMode && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prénom *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                required={!isLoginMode}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                required={!isLoginMode}
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe *
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            required
            minLength={6}
          />
        </div>

        {!isLoginMode && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+221 XX XXX XX XX"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Chargement...' : (isLoginMode ? 'Se connecter' : 'Créer un compte')}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => setIsLoginMode(!isLoginMode)}
          className="text-sm text-indigo-600 hover:text-indigo-500"
        >
          {isLoginMode 
            ? "Pas de compte ? Créer un compte" 
            : "Déjà un compte ? Se connecter"
          }
        </button>
      </div>

      {onClose && (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Continuer sans se connecter
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default QuickLogin;