import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const Actions = ({ 
  handleToggleModal, 
  hasSelectedUser, 
  handleEditUserClick, 
  handleDelete, 
  handleSearch 
}) => {
  return(
    <div className="actions">
      <button data-testid='addUser' onClick={handleToggleModal} className="action-button">
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <button 
        data-testid='editUser'
        disabled={!hasSelectedUser}
        onClick={handleEditUserClick} 
        className="action-button"
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>
      <button 
        data-testid='deleteUser'
        disabled={!hasSelectedUser}
        onClick={handleDelete} 
        className="action-button"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <div className="search-container">
        <input name="search" type="text" placeholder="Search..." onChange={handleSearch} />
      </div>
    </div>
  );
}

export default Actions;