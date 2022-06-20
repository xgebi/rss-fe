import React from 'react';
import { render, screen } from '@testing-library/react';
import {Navigation} from "./Navigation";
import { MemoryRouter } from 'react-router-dom';

test('renders input', () => {

  render(<MemoryRouter initialEntries={[{ pathname: '/' }]}>(<Navigation /></MemoryRouter>);
  let aElement = screen.getByText(/Home/i);
  expect(aElement.className.indexOf('active') >= 0).toBeTruthy();
  expect(aElement).toBeInTheDocument();
  aElement = screen.getByText(/Articles/i);
  expect(aElement).toBeInTheDocument();
  aElement = screen.getByText(/Podcasts/i);
  expect(aElement).toBeInTheDocument();
  aElement = screen.getByText(/Subscriptions/i);
  expect(aElement).toBeInTheDocument();
});