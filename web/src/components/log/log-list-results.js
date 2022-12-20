import { Box, Card } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { SeverityPill } from '../severity-pill';

import { logs } from '../../__mocks__/logs';

export const LogListResults = ({ ...rest }) => {
  const columns = [
    {
      field: 'logName',
      headerName: 'Log Name',
      flex: 1,
    },
    {
      field: 'logDescription',
      headerName: 'Log Description',
      flex: 3,
    },
    {
      field: 'logSource',
      headerName: 'Log Source',
      flex: 3,
    },
    {
      field: 'logStatus',
      headerName: 'Log Status',
      flex: 1,
      renderCell: ({ row: { logStatus } }) => {
        return (
          <SeverityPill color={(logStatus === 0 && 'success') || (logStatus === 1 && 'error')}>
            {logStatus === 0 ? 'Success' : 'Failed'}
          </SeverityPill>
        );
      },
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
  ];
  return (
    <Card {...rest}>
      <Box sx={{ minWidth: 1050 }} m="40px 0 0 0" height="65vh">
        <DataGrid rows={logs} columns={columns} components={{ Toolbar: GridToolbar }} disableSelectionOnClick={true} />
      </Box>
    </Card>
  );
};

LogListResults.propTypes = {
  logs: PropTypes.array.isRequired,
};
