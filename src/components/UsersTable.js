import React, { useEffect, useState } from "react";

import { DEFAULT_SELECTED, TITLE } from "../helpers/constants";
import { usersDummyData } from "../helpers/usersDummyData";

import FormModal from "./FormModal";
import Actions from "./Actions";
import User from "./User";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedAll, setSelectedAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    setUsers(usersDummyData);
  }, []);

  const handleCheckboxChange = (id) => {
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        user.selected = !user.selected;
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleSelectAll = () => {
    setSelectedAll(!selectedAll);

    const updatedUsers = users.map((user) => {
      user.selected = !selectedAll;
      return user;
    });

    setUsers(updatedUsers);
  };

  const handleDelete = () => {
    const updatedUsers = users.filter((user) => !user.selected);

    setUsers(updatedUsers);
  };

  const handleEdit = (user) => {
    const userIdExists = users.some((_user) => _user.userId === user.userId && user.userId !== userInfo.userId);

    if (userIdExists) {
      return {
        userId: 'User ID already exists',
      };
    }

    setUsers(
      users.map((_user) => {
        if (_user.id === user.id){
          return user;
        }
        return _user;
      })
    );
    setUserInfo({});

    return null;
  };

  const handleAdd = (user) => {
    const newUser = {
      id: Math.max(...users.map(user => user.id)) + 1,
      ...user,
      selected: false,
    };
    const emailExists = users.some((_user) => _user.email === user.email);
  
    if (emailExists){
      return {
        email: 'Email already exists',
      };
    }
  
    setUsers([...users, newUser]);
  
    return null;
  };  

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);

    if(hasSelectedUser){
      resetSelectedUser();
    }

    if (!showModal && !hasSelectedUser){
      setUserInfo({});
    }
  }

  const handleEditUserClick = () => {
    const [editUser] = users.filter((user) => user.selected);

    setUserInfo(editUser);
    handleToggleModal();
  }

  const filteredUsers = users.filter((user) => {
    return (
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const hasSelectedUser = users.some(user => user.selected === true);
  const resetSelectedUser = () => {
    setUsers(users.map((user) => {
      if (user.selected === true) {
        return {
          ...user,
          selected: DEFAULT_SELECTED,
        };
      }
  
      return user;
    }));
  }

  return (
    <div>
      <div className="header">
        <h2 className="header-title">{TITLE.toUpperCase()}</h2>
        <Actions
          handleToggleModal={handleToggleModal}
          hasSelectedUser={hasSelectedUser} 
          handleDelete={handleDelete}
          handleEditUserClick={handleEditUserClick}
          handleSearch={handleSearch}
        />
      </div>
      <table className="users-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Created On</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 && <tr><td colSpan={7} style={{ textAlign: 'center' }}>No users listed</td></tr>}
          {filteredUsers.map((user) => (
            <User 
              key={user.id}
              user={user}
              handleCheckboxChange={handleCheckboxChange}
            />
          ))}
        </tbody>
      </table>
      {showModal && (
        <FormModal 
          handleEdit={handleEdit}
          userInfo={userInfo}
          handleAdd={handleAdd} 
          handleToggleModal={handleToggleModal} 
        />
      )}
    </div>
  );
};

export default UsersTable;
        
