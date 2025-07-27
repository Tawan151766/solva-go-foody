import { render, screen } from '@testing-library/react';
import StoreDetail from '@/components/Stroe/Detail/StoreDetail';

describe('StoreDetail', () => {
  const store = {
    id: 1,
    name: 'Test Store',
    address: '123 Main St',
    rating: 4.5,
    image: 'test.jpg',
    openingHours: '08:00 - 20:00',
    nationality: 'ไทย',
    category: 'ก๋วยเตี๋ยว',
    lat: 13.7,
    lng: 100.5,
  };

  it('renders store details', () => {
    render(<StoreDetail store={store} />);
    // Should find at least one heading and one map card with the store name
    expect(screen.getAllByText('Test Store').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('123 Main St').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('4.5').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('08:00 - 20:00').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('ไทย').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('ก๋วยเตี๋ยว').length).toBeGreaterThanOrEqual(1);
  });

  it('shows map section', () => {
    render(<StoreDetail store={store} />);
    // There may be multiple elements with this text, just check at least one exists
    expect(screen.getAllByText(/ที่ตั้งร้าน/).length).toBeGreaterThanOrEqual(1);
  });
});
