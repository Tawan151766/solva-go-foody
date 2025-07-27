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
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';
import { FilterContext } from '@/context/FilterContext';

const mockStores = [
  {
    id: 1,
    name: 'Test Store',
    address: '123 Main St',
    rating: 4.5,
    image: 'test.jpg',
    openingHours: '08:00 - 20:00',
    nationality: 'ไทย',
    category: 'ก๋วยเตี๋ยว',
  },
];

describe('HomePage (Store Index)', () => {
  it('renders store cards when stores are available', () => {
    render(
      <FilterContext.Provider value={{ filteredStores: mockStores }}>
        <HomePage />
      </FilterContext.Provider>
    );
    expect(screen.getByText('Test Store')).toBeInTheDocument();
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('shows empty state when no stores', () => {
    render(
      <FilterContext.Provider value={{ filteredStores: [] }}>
        <HomePage />
      </FilterContext.Provider>
    );
    expect(screen.getByText(/ไม่พบร้านอาหารที่ตรงกับการค้นหา/)).toBeInTheDocument();
  });
});
