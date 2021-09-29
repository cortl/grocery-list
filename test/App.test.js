import React from 'react';
import {render, screen} from '@testing-library/react';
import App from '../src/App';

test('renders login page', () => {
  render(<App />);
  const linkElement = screen.getByText(/login/i);
  expect(linkElement).toBeInTheDocument();
});
