import React, { useState, useEffect } from 'react';

function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users'); // ricordati di sostituirlo poi con l'endpoint API reale
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="users-page">
      <h1>Utenti della Palestra</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <img src="/images/user-avatar.png" alt="User Avatar" className="user-avatar" />
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersPage
