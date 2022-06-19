import React from 'react';
import { render, screen } from '@testing-library/react';
import {Input} from './Input';

test('renders input', () => {
  let val = null;
  const onChangeTracker = (newVal: any) => {
    val = newVal
  }
  render(<Input label={"Test"} type={"text"} value={""} onChange={onChangeTracker} />);
  const labelElement = screen.getByText(/Test/i);
  expect(labelElement).toBeInTheDocument();
});