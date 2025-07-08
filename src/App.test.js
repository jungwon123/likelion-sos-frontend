import { render, screen } from '@testing-library/react';
import App from './App';

test('renders SOS app', () => {
  render(<App />);
  const sosElement = screen.getByText(/SOS/i);
  expect(sosElement).toBeInTheDocument();
});
