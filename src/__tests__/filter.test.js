import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';
import { FilterContext } from '@/context/FilterContext';

// Mock window.matchMedia for JSDOM
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe('HomePage filter logic', () => {
  const stores = [
    { id: 1, name: 'A', address: 'BKK', rating: 4, image: '', openingHours: '', nationality: 'ไทย', category: 'ก๋วยเตี๋ยว' },
    { id: 2, name: 'B', address: 'CNX', rating: 5, image: '', openingHours: '', nationality: 'ญี่ปุ่น', category: 'อาหารญี่ปุ่น' },
    { id: 3, name: 'C', address: 'BKK', rating: 3, image: '', openingHours: '', nationality: 'ไทย', category: 'อาหารทะเล' },
  ];

  it('shows only stores matching filteredStores', () => {
    render(
      <FilterContext.Provider value={{ filteredStores: stores.filter(s => s.nationality === 'ไทย') }}>
        <HomePage />
      </FilterContext.Provider>
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.queryByText('B')).not.toBeInTheDocument();
  });

  it('shows only stores matching category', () => {
    render(
      <FilterContext.Provider value={{ filteredStores: stores.filter(s => s.category === 'อาหารญี่ปุ่น') }}>
        <HomePage />
      </FilterContext.Provider>
    );
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.queryByText('A')).not.toBeInTheDocument();
    expect(screen.queryByText('C')).not.toBeInTheDocument();
  });
});
