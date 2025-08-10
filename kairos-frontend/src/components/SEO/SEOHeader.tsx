import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeaderProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  language?: string;
}

const SEOHeader: React.FC<SEOHeaderProps> = ({
  title = 'KAIROS Car Services - Transport Premium au Sénégal',
  description = 'Service de transport premium à Dakar et dans tout le Sénégal. Véhicules climatisés, chauffeurs expérimentés, disponible 24h/24. Réservation en ligne.',
  keywords = 'transport Sénégal, taxi Dakar, transfert aéroport, voiture avec chauffeur, transport premium Sénégal, KAIROS',
  image = '/images/kairos-social-preview.jpg',
  url = 'https://kairos-senegal.com',
  type = 'website',
  language = 'fr'
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "KAIROS Car Services",
    "description": description,
    "url": url,
    "logo": "/images/kairos-logo.png",
    "image": image,
    "telephone": "+221123456789",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Avenue Leopold Sedar Senghor",
      "addressLocality": "Dakar",
      "addressCountry": "SN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 14.7167,
      "longitude": -17.4677
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "priceRange": "$$",
    "areaServed": {
      "@type": "Country",
      "name": "Sénégal"
    },
    "serviceType": ["Transport de personnes", "Transfert aéroport", "Location avec chauffeur"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de Transport",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Transfert Aéroport",
            "description": "Transport depuis/vers l'aéroport Blaise Diagne"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Transport Urbain",
            "description": "Déplacements dans Dakar et banlieue"
          }
        }
      ]
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="language" content={language} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="KAIROS Car Services" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="KAIROS Car Services" />
      <meta property="og:locale" content={language === 'fr' ? 'fr_SN' : 'en_US'} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="theme-color" content="#FF7F50" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Preload Critical Resources */}
      <link rel="preload" href="/fonts/inter-v13-latin-regular.woff2" as="font" type="font/woff2" crossOrigin="" />
      <link rel="preload" href="/fonts/playfair-display-v30-latin-regular.woff2" as="font" type="font/woff2" crossOrigin="" />
    </Helmet>
  );
};

export default SEOHeader;