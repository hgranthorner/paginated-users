import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UserTable = ({ page }) => {
  const [users, setUsers] = useState([])

  const loadUsers = (pageNum = 0) => {
    useEffect(() => {
      axios
        .get(`https://acme-users-api.herokuapp.com/api/users/${pageNum}`)
        .then(res => setUsers(res.data.users))
        .catch(() => console.error('Failed to get users'))
    }, [page])
  }

  loadUsers(page)

  return (
    <table className="table">
      <thead>
        <tr>
          <th>First</th>
          <th>Middle</th>
          <th>Last</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.firstName}</td>
            <td>{user.middleName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UserTable
