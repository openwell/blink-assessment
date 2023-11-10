import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './pages/Home';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Conversations/i);
  expect(linkElement).toBeInTheDocument();
});
