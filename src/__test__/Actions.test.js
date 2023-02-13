import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Actions from '../components/Actions';

describe('Actions', () => {
  it('displays add user button', () => {
    const { getByTestId } = render(<Actions />);

    expect(getByTestId('addUser')).toBeInTheDocument();
  });

  it('displays edit user button', () => {
    const { getByTestId } = render(<Actions />);

    expect(getByTestId('editUser')).toBeInTheDocument();
  });

  it('displays delete user button', () => {
    const { getByTestId } = render(<Actions />);

    expect(getByTestId('deleteUser')).toBeInTheDocument();
  });

  it('disables edit and delete buttons if no user is selected', () => {
    const { getByTestId } = render(<Actions hasSelectedUser={false} />);
    const editButton = getByTestId('editUser');
    const deleteButton = getByTestId('deleteUser');

    expect(editButton).toBeDisabled();
    expect(deleteButton).toBeDisabled();
  });

  it('enables edit and delete buttons if a user is selected', () => {
    const { getByTestId } = render(<Actions hasSelectedUser={true} />);
    const editButton = getByTestId('editUser');
    const deleteButton = getByTestId('deleteUser');

    expect(editButton).not.toBeDisabled();
    expect(deleteButton).not.toBeDisabled();
  });

  it('calls handleToggleModal when add user button is clicked', () => {
    const handleToggleModal = jest.fn();
    const { getByTestId } = render(<Actions handleToggleModal={handleToggleModal} />);

    fireEvent.click(getByTestId('addUser'));

    expect(handleToggleModal).toHaveBeenCalled();
  });

  it('calls handleEditUserClick when edit user button is clicked', () => {
    const handleEditUserClick = jest.fn(); 
    const { getByTestId } = render(<Actions handleEditUserClick={handleEditUserClick} hasSelectedUser={true} />);

    fireEvent.click(getByTestId('editUser'));

    expect(handleEditUserClick).toHaveBeenCalled();
  });

  it('calls handleDelete when delete user button is clicked', () => {
    const handleDelete = jest.fn();
    const { getByTestId } = render(<Actions handleDelete={handleDelete} hasSelectedUser={true} />);

    fireEvent.click(getByTestId('deleteUser'));

    expect(handleDelete).toHaveBeenCalled();
  });

  it('calls handleSearch when text is entered in the search input', () => {
    const handleSearch = jest.fn();
    const { getByPlaceholderText } = render(
      <Actions handleSearch={handleSearch} />
    );
    const searchInput = getByPlaceholderText('Search...');
    
    fireEvent.change(searchInput, { target: { value: 'Test search' } });

    expect(handleSearch).toHaveBeenCalled();
    expect(searchInput).toHaveValue('Test search');
    });
  });
