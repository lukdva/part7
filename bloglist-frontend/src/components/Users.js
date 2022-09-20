import React from 'react'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from '@mui/material'

const Users = ({ users }) => {
  if (!users) return null
  return (
    <>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Users
