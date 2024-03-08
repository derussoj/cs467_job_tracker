/*
code provided by ChatGPT4 via chat.openai.com

Prompt(s): requested help creating a test file and placeholder test
*/
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders without crashing', () => {
  render(<App />);

  // TODO: Change this to match some text we expect to see on the working page
  const linkElement = screen.getByText(/HomePage placeholder/i);
  expect(linkElement).toBeInTheDocument();
});
