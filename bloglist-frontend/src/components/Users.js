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
  Typography,
  //   Button,
  //   ListItemButton,
} from '@mui/material'

const Users = ({ users }) => {
  if (!users) return null
  return (
    <>
      <Typography variant={'h2'}>Users</Typography>
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
                <TableCell
                  component={Link}
                  to={`/users/${user.id}`}
                  sx={{ textDecoration: 'none' }}
                >
                  {user.name}
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
