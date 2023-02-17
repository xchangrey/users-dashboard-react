import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import FormModal from '../components/AddEditForm';
import { FormControl } from '@mui/material';

afterEach(cleanup);

describe("FormModal", () => {
  const mockHandleToggleModal = jest.fn();
  const mockHandleAdd = jest.fn();
  const mockHandleEdit = jest.fn();
  const userInfo = {
    id: 1,
    userId: "user123",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    status: "registered",
  };

  beforeEach(() => {
    mockHandleToggleModal.mockClear();
    mockHandleAdd.mockClear();
  });

  test("renders add user form", async () => {
    render(
      <FormModal
        handleToggleModal={mockHandleToggleModal}
        handleAdd={mockHandleAdd}
        handleEdit={mockHandleEdit}
      />
    );

    const titleElement = screen.getByText("Add User Information");
    expect(titleElement).toBeInTheDocument();

    const firstNameInput = screen.getByLabelText("First Name");
    expect(firstNameInput).toBeInTheDocument();
    expect(firstNameInput).toBeEmptyDOMElement();

    const lastNameInput = screen.getByLabelText("Last Name");
    expect(lastNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeEmptyDOMElement();

    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toBeEmptyDOMElement();

    const statusInput = screen.getByLabelText("Status");
    expect(statusInput).toBeInTheDocument();
    expect(statusInput).toHaveValue("");

    const submitButton = screen.getByRole("button", { name: "ADD" });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeEnabled();
  });

  test("renders edit user form with user data", async () => {
    render(
      <FormModal
        handleToggleModal={mockHandleToggleModal}
        handleAdd={mockHandleAdd}
        handleEdit={mockHandleEdit}
        userInfo={userInfo}
      />
    );

    const titleElement = screen.getByText("Edit User Information");
    expect(titleElement).toBeInTheDocument();

    const userIdInput = screen.getByLabelText("User ID");
    expect(userIdInput).toBeInTheDocument();
    expect(userIdInput).toHaveValue(userInfo.userId);

    const firstNameInput = screen.getByLabelText("First Name");
    expect(firstNameInput).toBeInTheDocument();
    expect(firstNameInput).toHaveValue(userInfo.firstName);

    const lastNameInput = screen.getByLabelText("Last Name");
    expect(lastNameInput).toBeInTheDocument();
    expect(lastNameInput).toHaveValue(userInfo.lastName);

    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveValue(userInfo.email);

    const statusInput = screen.getByText(/status/i);
    expect(statusInput).toBeInTheDocument();
    expect(statusInput).toHaveValue(userInfo.status);

    const submitButton = screen.getByRole("button", { name: "EDIT" });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeEnabled();
  });

  test('submitting add user form with valid data', async () => {
    render(
      <FormModal 
        handleToggleModal={mockHandleToggleModal} 
        handleAdd={mockHandleAdd} 
        userInfo={userInfo}
      />
    );

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const statusInput = screen.getByLabelText(/status/i);
    const submitButton = screen.getByText(/add/i);

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(statusInput, { target: { value: 'registered' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleAdd).toHaveBeenCalledTimes(1);
      expect(mockHandleAdd).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        status: 'registered',
        selected: 'no',
        createdOn: expect.any(String),
        userId: expect.any(String)
      });
    });

    expect(mockHandleToggleModal).toHaveBeenCalledTimes(1);
  });

  test('renders status field with selected value when editing', () => {
    const userInfo = {
      id: 1,
      userId: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      status: 'registered',
    };
    const handleToggleModal = jest.fn();
    const handleAdd = jest.fn();
    const handleEdit = jest.fn();
  
    render(
      <FormControl>
        <FormModal
          handleToggleModal={handleToggleModal}
          handleAdd={handleAdd}
          handleEdit={handleEdit}
          userInfo={userInfo}
        />
      </FormControl>
    );
  
    const statusField = screen.getByLabelText(/status/i);
    expect(statusField).toBeInTheDocument();
    expect(statusField).toHaveValue('registered'); // assert the initial value
  
    userEvent.selectOptions(statusField, 'initiated'); // change the value
    expect(statusField).toHaveValue('initiated');
  
    const submitButton = screen.getByRole('button', { name: /edit/i });
    userEvent.click(submitButton); // submit the form
    expect(handleEdit).toHaveBeenCalledWith({
      ...userInfo,
      status: 'initiated',
    });
  });
});

