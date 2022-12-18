import { useState } from 'react';
import { Box, Button, Card, Stack } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { SeverityPill } from '../severity-pill';

import { UserModalEdit } from './user-modal-edit';
import { UserModalDelete } from './user-modal-delete';

export const UserListResults = ({ users, userPermission, ...rest }) => {
  const [user, setUser] = useState();

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = (data) => {
    setUser(data);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setUser(null);
    setOpenEdit(false);
  };

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setUser(null);
    setOpenDelete(false);
  };

  const canSeeActions = userPermission.canUpdateUser || userPermission.canDeleteUser;
  const columns = [
    {
      field: 'firstName',
      headerName: 'Firstname',
      flex: 1,
    },
    {
      field: 'lastName',
      headerName: 'Lastname',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'createdOn',
      headerName: 'Created On',
      flex: 1,
    },
    {
      field: 'updatedOn',
      headerName: 'Updated On',
      flex: 1,
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <SeverityPill color={(role === 1 && 'error') || (role === 2 && 'warning') || 'success'}>
            {role === 1 ? 'Administrator' : role === 2 ? 'Supervisor' : role === 3 ? 'Distributor' : 'Unassigned'}
          </SeverityPill>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => {
        if (params.row.role !== 1) {
          return (
            <Stack direction="row" justifyContent="space-between" spacing={2} alignItems="baseline">
              {userPermission.canUpdateUser && (
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: 16 }}
                  onClick={() => handleOpenEdit(params.row)}
                >
                  Edit
                </Button>
              )}
              {userPermission.canDeleteUser && (
                <Button variant="contained" color="secondary" style={{ marginLeft: 16 }} onClick={handleOpenDelete}>
                  Delete
                </Button>
              )}
            </Stack>
          );
        }
        return (
          <Stack direction="row" justifyContent="space-between" spacing={2} alignItems="baseline">
            <Button variant="contained" disabled={true} style={{ marginLeft: 16 }}>
              Actions Disabled
            </Button>
          </Stack>
        );
      },
    },
  ];
  return (
    <Card {...rest}>
      <Box sx={{ minWidth: 1050 }} m="40px 0 0 0" height="65vh">
        <UserModalEdit user={user} open={openEdit} onClose={handleCloseEdit} />
        <UserModalDelete open={openDelete} onClose={handleCloseDelete} />
        <DataGrid
          rows={users}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          disableSelectionOnClick={true}
          columnVisibilityModel={{ actions: canSeeActions }}
        />
      </Box>
    </Card>
  );
};

UserListResults.propTypes = {
  users: PropTypes.array.isRequired,
};
