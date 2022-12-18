import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { UserModalCreate } from './user-modal-create';

export const UserListToolbar = ({ userPermission }, props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Users
        </Typography>
        <Box sx={{ m: 1 }}>
          <UserModalCreate open={open} onClose={handleClose} />
          {userPermission.canCreateUser && (
            <Button color="primary" variant="contained" onClick={handleOpen}>
              Create User
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};
