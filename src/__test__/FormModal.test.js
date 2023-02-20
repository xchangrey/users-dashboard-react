import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Formik } from 'formik';
import AddEditForm from '../components/AddEditForm';

describe('AddEditForm', () => {
  const handleToggleModal = jest.fn();
  const handleAdd = jest.fn();
  const handleEdit = jest.fn();
  const userInfo = {
    id: '123',
    userId: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    status: 'active',
  };
  const isEdit = true;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form with initial values', () => {
    render(
      <AddEditForm
        handleToggleModal={handleToggleModal}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        userInfo={userInfo}
        isEdit={isEdit}
      />
    );

    expect(screen.getByLabelText(/user id/i)).toHaveValue('johndoe');
    expect(screen.getByLabelText(/first name/i)).toHaveValue('John');
    expect(screen.getByLabelText(/last name/i)).toHaveValue('Doe');
    expect(screen.getByLabelText(/email/i)).toHaveValue('johndoe@example.com');
    expect(screen.getByLabelText(/status/i)).toHaveValue('active');
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
  });

  test('calls handleAdd when submitting form for adding new user', async () => {
    render(
      <Formik initialValues={{}} onSubmit={handleAdd}>
        <AddEditForm handleToggleModal={handleToggleModal} handleAdd={handleAdd} isEdit={false} />
      </Formik>
    );

    act(() => {
      userEvent.type(screen.getByLabelText(/first name/i), 'John');
      userEvent.type(screen.getByLabelText(/last name/i), 'Doe');
      userEvent.type(screen.getByLabelText(/email/i), 'johndoe@example.com');
      fireEvent.change(screen.getByLabelText(/status/i), { target: { value: 'active' } });
  
      fireEvent.click(screen.getByRole('button', { name: /add/i }));
    });

    expect(handleAdd).toHaveBeenCalledTimes(1);
    expect(handleAdd).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      status: 'active',
      userId: expect.any(String),
      selected: 'none',
      createdOn: expect.any(Number),
    });
    expect(handleToggleModal).toHaveBeenCalledTimes(1);
  });

  test('calls handleEdit when submitting form for editing existing user', async () => {
    render(
      <Formik initialValues={{}} onSubmit={handleEdit}>
        <AddEditForm handleToggleModal={handleToggleModal} handleEdit={handleEdit} userInfo={userInfo} isEdit={true} />
      </Formik>
    );

    userEvent.type(screen.getByLabelText(/first name/i), '{selectall}Jane');
    userEvent.type(screen.getByLabelText(/last name/i), '{selectall}Doe');
    userEvent.type(screen.getByLabelText(/email/i), '{selectall}janedoe@example.com');
    // fireEvent.change(screen.getByLabelText(/status/i), { target: { value: 'inactive' } });

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));

    expect(handleEdit).toHaveBeenCalledTimes(1);
    expect(handleEdit).toHaveBeenCalledWith({
      id: '123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      status: 'active',
      userId: expect.any(String),
      selected: 'none',
      createdOn: expect.any(Number)
    });
  });
});
