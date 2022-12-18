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

const roles = [
  {
    value: 2,
    label: 'Supervisor',
  },
  {
    value: 3,
    label: 'Distributor',
  },
];

export const UserModalCreate = ({ ...props }) => {
  return (
    <Modal {...props}>
      <form autoComplete="off">
        <Card sx={style}>
          <CardHeader title="Create New User" subheader="Complete the following fields" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  label="First name"
                  name="firstName"
                  required
                  variant="outlined"
                  helperText="Please specify the user first name"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  label="Last name"
                  name="lastName"
                  required
                  variant="outlined"
                  helperText="Please specify the user last name"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  required
                  variant="outlined"
                  helperText="Please specify the user email"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Role"
                  name="role"
                  required
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                  helperText="Please specify the user role"
                >
                  {roles.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
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
              <Button color="primary" variant="contained">
                Create User
              </Button>
            </Stack>
          </Box>
        </Card>
      </form>
    </Modal>
  );
};
