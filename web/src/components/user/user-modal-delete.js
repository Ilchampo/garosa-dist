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

export const UserModalDelete = ({ ...props }) => {
  return (
    <Modal {...props}>
      <form autoComplete="off">
        <Card sx={style}>
          <CardHeader title="Delete Existing User" subheader="Are you sure you want to delete this user?" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField label="First name" disabled={true} variant="filled" />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField label="Last name" disabled={true} variant="filled" />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField fullWidth label="Email" disabled={true} variant="filled" />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField fullWidth label="Role" disabled={true} variant="filled" />
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
                Delete User
              </Button>
            </Stack>
          </Box>
        </Card>
      </form>
    </Modal>
  );
};
