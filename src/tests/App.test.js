import React from 'react';
import { render } from '@testing-library/react';
import App from '../components/App';
import '@testing-library/jest-dom/extend-expect';

test('renders hello world text on template', () => {
  const { getByText } = render(<App />);
  const divElement = getByText(/hello world/i);
  expect(divElement).toBeInTheDocument();
});
