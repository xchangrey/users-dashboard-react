import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import User from '../components/User';
import { usersDummyData } from '../helpers/usersDummyData';

describe('User', () => {
  it('displays user information', () => {
    const handleCheckboxChange = jest.fn();
    const { getByTestId, getByRole } = render(
      <table>
        <thead></thead>
        <tbody>
          <User user={usersDummyData[0]} handleCheckboxChange={handleCheckboxChange} />
        </tbody>
      </table>
    );
    const userRow = getByTestId('userEntry');
    const checkbox = getByRole('checkbox');

    expect(userRow).toBeInTheDocument();
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);

    expect(handleCheckboxChange).toHaveBeenCalledWith(1);
  })
})