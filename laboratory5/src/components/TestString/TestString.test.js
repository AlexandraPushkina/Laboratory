import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestString from './TestString';

describe('<testString />', () => {
  test('it should mount', () => {
    render(<TestString />);

    const testString = screen.getByTestId('TestString');

    expect(testString).toBeInTheDocument();
  });
});