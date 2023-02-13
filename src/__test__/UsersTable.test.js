import React from 'react';
import { render, cleanup } from '@testing-library/react';
import UsersTable from '../components/UsersTable';
import { usersDummyData } from '../helpers/usersDummyData';

afterEach(cleanup);

describe('UsersTable', () => {
  it('displays the users data', () => {
    const { getByText } = render(<UsersTable users={usersDummyData} />);

    usersDummyData.forEach(user => {
      expect(getByText(user.userId)).toBeInTheDocument();
      expect(getByText(user.firstName)).toBeInTheDocument();
      expect(getByText(user.lastName)).toBeInTheDocument();
      expect(getByText(user.email)).toBeInTheDocument();
      expect(getByText(user.status.toUpperCase())).toBeInTheDocument();
    });
  });
});
