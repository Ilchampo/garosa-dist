import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, Modal, Stack, TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 'auto',
  boxShadow: 24,
  p: 4,
};

export const UserModalEdit = ({ ...props }) => {
  const initValues = {
    id: props.user ? props.user.id : 0,
    firstName: props.user ? props.user.firstName : '',
    lastName: props.user ? props.user.lastName : '',
    email: props.user ? props.user.email : '',
    role: props.user ? props.user.role : 0,
  };

  const handleSubmit = (initValues) => {
    console.log(initValues);
  };

  return (
    <Modal {...props}>
      <form onClick={handleSubmit}>
        <Card sx={style}>
          <CardHeader title="Edit Existing User" subheader="Complete the following fields" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  label="First name"
                  name="firstName"
                  required
                  defaultValue={initValues.firstName}
                  variant="outlined"
                  helperText="Please specify the user first name"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  label="Last name"
                  name="lastName"
                  required
                  defaultValue={initValues.lastName}
                  variant="outlined"
                  helperText="Please specify the user last name"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  disabled={true}
                  defaultValue={initValues.email}
                  variant="filled"
                  helperText="The user email cannot be edited"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Role"
                  name="role"
                  disabled={true}
                  defaultValue={
                    initValues.role === 1 ? 'Administrator' : initValues.role === 2 ? 'Supervisor' : 'Distributor'
                  }
                  variant="filled"
                  helperText="The user role cannot be edited"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <Button fullWidth color="success" variant="contained">
                  Recover Password
                </Button>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2,
            }}
          >
            <Stack direction="row" spacing={2}>
              <Button color="secondary" variant="contained" onClick={props.onClose}>
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="contained">
                Edit User
              </Button>
            </Stack>
          </Box>
        </Card>
      </form>
    </Modal>
  );
};
