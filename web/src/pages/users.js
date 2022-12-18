import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { UserListResults } from '../components/user/user-list-results';
import { UserListToolbar } from '../components/user/user-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { users } from '../__mocks__/users';
// import { getAllUsers } from '../data/users';

const userPermission = {
  canCreateUser: true,
  canReadUser: true,
  canUpdateUser: true,
  canDeleteUser: true,
};

const Page = () => (
  <>
    <Head>
      <title>Users | Garosa Dist Web</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <UserListToolbar userPermission={userPermission} />
        <Box sx={{ mt: 3 }}>
          <UserListResults users={users} userPermission={userPermission} />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
