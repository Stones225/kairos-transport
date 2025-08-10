import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HeroSection from './HeroSection';

describe('HeroSection', () => {
  it('renders hero content and features', () => {
    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', { name: /Votre Partenaire de Transport/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Disponible 24h/24')).toBeInTheDocument();
    expect(screen.getByText('Service sécurisé')).toBeInTheDocument();
  });
});
