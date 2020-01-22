import React, {useState, useEffect} from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

const ListUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get('api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="list-container">
      <h1>Users</h1>
      <div className="user-container">
        {users.map(user => (
          <div className="user" key={user.id}>
            <h3>{user.username}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListUsers;
