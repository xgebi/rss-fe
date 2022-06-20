import React from 'react';
import {act, fireEvent, render, screen} from '@testing-library/react';
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

test('fires event', () => {
  let val = null;
  const onChangeTracker = (newVal: any) => {
    val = newVal
  }
  render(<Input label={"Test"} type={"text"} value={""} onChange={onChangeTracker} />);
  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toBeInTheDocument();
  fireEvent.change(inputElement, {target: {value: '3'}})
  expect(val).toBe('3');
});