import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import FormModal from '../components/FormModal';
import { timestamp } from '../helpers/utils';

afterEach(cleanup);

describe('FormModal component', () => {
  it('should render the form correctly', () => {
  const handleToggleModal = jest.fn();
  const handleAdd = jest.fn();
  const handleEdit = jest.fn();

  const { getByTestId, getByText } = render(
    <FormModal 
      handleToggleModal={handleToggleModal}
      handleAdd={handleAdd}
      handleEdit={handleEdit}
    />
  );
  
  const firstNameInput = getByTestId('firstName');
  const lastNameInput = getByTestId('lastName');
  const emailInput = getByTestId('email');
  const statusInput = getByTestId('status');
  const submitButton = getByText('ADD');
  
  expect(firstNameInput).toBeInTheDocument();
  expect(lastNameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(statusInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  })

  it('should update the form fields when input changes', () => {
    const handleToggleModal = jest.fn();
    const handleAdd = jest.fn();
    const handleEdit = jest.fn();

    const { getByTestId } = render(
      <FormModal 
        handleToggleModal={handleToggleModal}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
      />
    );
    
    const firstNameInput = getByTestId('firstName');
    const lastNameInput = getByTestId('lastName');
    const emailInput = getByTestId('email');
    const statusInput = getByTestId('status');
    
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(statusInput, { target: { value: 'Active' } });
    
    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
    expect(emailInput.value).toBe('john.doe@example.com');
    expect(statusInput.value).toBe('Active');    
  });

  it('should call the handleAdd function when form is submitted and there is no user info', () => {
    const handleToggleModal = jest.fn();
    const handleAdd = jest.fn();
    const handleEdit = jest.fn();

    const { getByTestId, getByText } = render(
      <FormModal 
        handleToggleModal={handleToggleModal}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
      />
    );
    
    const firstNameInput = getByTestId('firstName');
    const lastNameInput = getByTestId('lastName');
    const emailInput = getByTestId('email');
    const statusInput = getByTestId('status');
    const submitButton = getByText('ADD');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(statusInput, { target: { value: 'Active' } });

    
    fireEvent.click(submitButton);

    expect(handleAdd).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      status: 'Active', 
      selected: false,
      createdOn: timestamp(),
    });
  });

  it("should update user info when form is submitted", () => {
    const mockEdit = jest.fn();
    const userInfo = {
      userId: 'johndoe',
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@email.com",
      status: "active"
    };

    const { getByTestId, getByText } = render(
      <FormModal 
        handleToggleModal={jest.fn()} 
        handleAdd={jest.fn()} 
        handleEdit={mockEdit} 
        userInfo={userInfo} 
      />
    );

    const userIdInput = getByTestId('userId');
    const firstNameInput = getByTestId("firstName");
    const lastNameInput = getByTestId("lastName");
    const emailInput = getByTestId("email");
    const statusInput = getByTestId("status");
    const submitBtn = getByText("EDIT");

    fireEvent.change(userIdInput, { target: { value: "janedoes" } });
    fireEvent.change(firstNameInput, { target: { value: "Jane" } });
    fireEvent.change(lastNameInput, { target: { value: "Does" } });
    fireEvent.change(emailInput, { target: { value: "janedoe@email.com" } });
    fireEvent.change(statusInput, { target: { value: "inactive" } });
    fireEvent.click(submitBtn);

    expect(mockEdit).toHaveBeenCalledWith({
      userId: 'janedoes',
      firstName: "Jane",
      lastName: "Does",
      email: "janedoe@email.com",
      status: "inactive",
      selected: false,
      createdOn: timestamp(),
    });
  });
})

