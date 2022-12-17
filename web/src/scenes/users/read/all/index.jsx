import { Box, Typography, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useTheme } from '@mui/material';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HelpIcon from '@mui/icons-material/Help';

import { tokens } from '../../../../theme';
import { useUser } from './utils';
import Header from '../../../../components/Header';
import GetUser from '../user/index';

const UsersList = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { users, isLoading } = useUser();

    const canSeeActions = true;

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 0.5,
        },
        {
            field: 'firstName',
            headerName: 'Firstname',
            flex: 1,
            cellClassName: 'name-column--cell',
        },
        {
            field: 'lastName',
            headerName: 'Lastname',
            flex: 1,
            cellClassName: 'name-column--cell',
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
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            role === 1
                                ? colors.greenAccent[600]
                                : role === 2
                                ? colors.greenAccent[700]
                                : colors.greenAccent[700]
                        }
                        borderRadius="4px"
                    >
                        {role === 1 && <AdminPanelSettingsIcon />}
                        {role === 2 && <SupervisedUserCircleIcon />}
                        {role === 3 && <LocalShippingIcon />}
                        {role === undefined && <HelpIcon />}
                        <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
                            {role === 1
                                ? 'Administrator'
                                : role === 2
                                ? 'Supervisor'
                                : role === 3
                                ? 'Distributor'
                                : 'Unassigned'}
                        </Typography>
                    </Box>
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
                        <strong>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                style={{ marginLeft: 16 }}
                                onClick={() => {
                                    
                                    console.log(params.row.id);
                                }}
                            >
                                Edit
                            </Button>
                            <Button variant="contained" color="secondary" size="small" style={{ marginLeft: 16 }}>
                                Delete
                            </Button>
                        </strong>
                    );
                }
                return (
                    <strong>
                        <Button variant="disabled" color="primary" size="small" style={{ marginLeft: 16 }}>
                            Actions Disabled
                        </Button>
                    </strong>
                );
            },
        },
    ];

    return (
        <Box m="20px">
            <Header title="List Users" subtitle="List of existing users" />
            <Button variant="contained" color="secondary">
                Create User
            </Button>
            <GetUser />
            <Box
                m="40px 0 0 0"
                height="70vh"
                sx={{
                    '& .MuiDataGrid-root': {
                        border: 'none',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: 'none',
                    },
                    '& .name-column--cell': {
                        color: colors.greenAccent[300],
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: 'none',
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        backgroundColor: colors.primary[400],
                    },
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: 'none',
                        backgroundColor: colors.blueAccent[700],
                    },
                    '& .MuiCheckbox-root': {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                {!isLoading && (
                    <DataGrid
                        rows={users}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                        columnVisibilityModel={{ id: false, actions: canSeeActions }}
                    />
                )}
            </Box>
        </Box>
    );
};

export default UsersList;
