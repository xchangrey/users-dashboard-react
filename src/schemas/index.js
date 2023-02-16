import * as yup from 'yup';

export const basicSchema = yup.object().shape({
  userId: yup.string("Please enter a unique user ID").min(2),
  firstName: yup.string("Please enter a valid first name").required().min(2),
  lastName: yup.string("Please enter a valid last name").required().min(2),
  email: yup.string().email("Please enter a valid email").required("Required"),
  status: yup.string("Please enter a valid status").required().min(2),
});