import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Form, Field, Formik } from "formik";
import { Button, Grid, MenuItem } from "@mui/material";
import { Select, TextField } from "formik-material-ui";

import { createUserId, timestamp } from "../helpers/utils";
import { DEFAULT_SELECTED } from "../helpers/constants";
import { basicSchema } from "../schemas";

const FormModal = ({ handleToggleModal, handleAdd, handleEdit, userInfo = {} }) => {
  const [isEdit] = useState(Object.keys(userInfo).length > 0);
  const text = isEdit ? 'Edit' : 'Add';
  const initialValues = {
    ...userInfo,
    userId: userInfo.userId || '',
    firstName: userInfo.firstName || '',
    lastName: userInfo.lastName || '',
    email: userInfo.email || '',
    status: userInfo.status || '',
  };
  
  const handleOnSubmit = async (values, actions) => {
    actions.setSubmitting(true);

    const user = {
      ...values,
      selected: DEFAULT_SELECTED,
      createdOn: timestamp(),
    };
  
    let error;
    if (isEdit) {
      error = await handleEdit({
        ...user,
        id: userInfo.id,
      });
    } else {
      try {
        await handleAdd({
          ...user,
          userId: createUserId(values.firstName, values.lastName),
        });
      } catch (err) {
        error = { email: err.message };
      }
    }
  
    if (error && Object.keys(error).length > 0) {
      actions.setErrors(error);
    } else {
      actions.setErrors({});
      actions.resetForm();

      handleToggleModal();
    }

    actions.setSubmitting(false);
  };  

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{`${text} User Information`}</h2>
        <button className="close-button" onClick={handleToggleModal}>
          <FontAwesomeIcon icon={faClose} />
        </button>
        <Formik 
          initialValues ={initialValues}
          validationSchema={basicSchema}
          onSubmit={handleOnSubmit}
        >
        {({ values, handleBlur, handleChange, isSubmitting }) => (
          <Form autoComplete="off">
            <Grid container spacing={2}>
              {isEdit && (
                <Grid item>
                  <Field
                    value={values.userId} 
                    name="userId" 
                    component={TextField} 
                    label="User ID" 
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Grid>
              )}
              <Grid item>
                <Field 
                  value={values.firstName}
                  name="firstName" 
                  component={TextField} 
                  label="First Name" 
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <Field
                  value={values.lastName} 
                  name="lastName" 
                  component={TextField} 
                  label="Last Name" 
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <Field
                  value={values.email} 
                  name="email" 
                  type="email" 
                  component={TextField} 
                  label="Email" 
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <Field
                  value={values.status} 
                  name="status" 
                  inputProps={{ id: "status" }}
                  label= 'Status'
                  component={Select} 
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <MenuItem value="registered">Registered</MenuItem>
                  <MenuItem value="initiated">Initiated</MenuItem>
                </Field>
              </Grid>
              <Grid item>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained" 
                  color="primary"
                >
                  {isSubmitting ? `${text}ing`.toUpperCase() : text.toUpperCase()}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
        </Formik>
      </div>
    </div>
  );
};

export default FormModal;