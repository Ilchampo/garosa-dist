import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { LogListToolbar } from '../components/log/log-list-toolbar';
import { LogListResults } from '../components/log/log-list-results';

const Page = () => (
  <>
    <Head>
      <title>Logs | Garosa Dist Web</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <LogListToolbar />
        <Box sx={{ mt: 3 }}>
          <LogListResults />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
