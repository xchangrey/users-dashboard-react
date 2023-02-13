const User = ({user, handleCheckboxChange }) => {
  return(
    <tr data-testid='userEntry'>
      <td>
        <input
          className="selectCheckbox"
          type="checkbox"
          checked={user.selected}
          onChange={() => handleCheckboxChange(user.id)}
        />
      </td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.status.toUpperCase()}</td>
      <td>{user.createdOn}</td>
    </tr>
  );
}

export default User;