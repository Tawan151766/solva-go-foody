// Example test to verify Jest is working
import { render, screen } from '@testing-library/react';

describe('App smoke test', () => {
  it('renders without crashing', () => {
    render(<div>Solva Go Foody</div>);
    expect(screen.getByText('Solva Go Foody')).toBeInTheDocument();
  });
});
