import { render, screen } from '@testing-library/react';
import FlightAndChalk from '../FlightandChalk';

describe('FlightAndChalk', () => {
  it('renders without crashing', () => {
    render(<FlightAndChalk />);
    // Add your assertions here based on what your component should render
    // For example:
    // expect(screen.getByText('Your Expected Text')).toBeInTheDocument();
  });
}); 