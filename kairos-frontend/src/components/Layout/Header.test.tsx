import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

jest.mock('../Common/LanguageSelector', () => () => <div>LanguageSelector</div>);
jest.mock('../Auth/LoginModal', () => ({ isOpen }: { isOpen: boolean }) =>
  isOpen ? <div data-testid="login-modal">Login Modal</div> : null
);
jest.mock('../../contexts/LanguageContext', () => ({
  useLanguage: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        'nav.home': 'Accueil',
        'nav.services': 'Services',
        'nav.contact': 'Contact',
        'nav.booking': 'Réserver'
      };
      return map[key] || key;
    }
  })
}));
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    currentUser: null,
    userProfile: null,
    logout: jest.fn()
  })
}));

describe('Header', () => {
  const renderHeader = () =>
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

  it('renders navigation items', () => {
    renderHeader();
    expect(screen.getByText('Accueil')).toBeInTheDocument();
    expect(screen.getByText('Tarifs')).toBeInTheDocument();
  });

  it('opens mobile menu when toggle is clicked', () => {
    renderHeader();
    expect(screen.getAllByText('Réserver').length).toBe(1);
    fireEvent.click(screen.getByLabelText('Toggle menu'));
    expect(screen.getAllByText('Réserver').length).toBe(2);
  });
});
