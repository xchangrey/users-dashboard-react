import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { timestamp } from "../helpers/utils";
import { DEFAULT_SELECTED } from "../helpers/constants";

const FormModal = ({ handleToggleModal, handleAdd, handleEdit, userInfo = {} }) => {
  const [user, setUser] = useState(userInfo);
  const [error, setError] = useState('');
  const [isEdit, setIsEdit] = useState(Object.keys(userInfo).length > 0);

  const handleSubmit = e => {
    e.preventDefault();

    if (isEdit){
      handleEdit({
        ...user,
        selected: DEFAULT_SELECTED, 
        createdOn: timestamp(),
      });
      handleToggleModal();
    } else {
      const userError = handleAdd({
        ...user,
        selected: DEFAULT_SELECTED, 
        createdOn: timestamp(),
      });

      setError(userError);

      if (!userError) {
        setUser({});
        setError('');
        handleToggleModal();
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();

    setUser({...user, [e.target.name]: e.target.value});
  }

  const text = isEdit ? 'Edit' : 'Add';

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{`${text} User Information`}</h2>
        {error && <p className="error">{error}</p>}
        <button className="close-button" onClick={(e) => handleToggleModal()}>
          <FontAwesomeIcon icon={faClose} />
        </button>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input className="form-input" type="text" name="firstName" value={user.firstName || ''} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Last Name:
            <input className="form-input" type="text" name="lastName" value={user.lastName || ''} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Email:
            <input className="form-input" type="email" name="email" value={user.email || ''} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Status:
            <input className="form-input" type="text" name="status" value={user.status || ''} onChange={handleChange} required />
          </label>
          <br />
          <button type="submit">{text.toUpperCase()}</button>
        </form>
      </div>
    </div>
  );
};

export default FormModal;