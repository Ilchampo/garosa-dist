// Keep this object up to date with any database change in role_permission
export const permission = {
    // Application Configuration Permissions
    createApplicationConfiguration: 'createApplicationConfiguration',
    getApplicationConfiguration: 'getApplicationConfiguration',
    updateApplicationConfiguration: 'updateApplicationConfiguration',
    deleteApplicationConfiguration: 'DeleteApplicationConfiguration',

    // Logs Permissions
    createLog: 'createLog',
    getAllLogs: 'getAllLogs',
    deleteLogById: 'deleteLogById',
    deleteLogsByUserId: 'deleteLogsByUserId',

    // Distribution Points Permissions
    createPoint: 'createPoint',
    getAllPoints: 'getAllPoints',
    getPointById: 'getPointById',
    updatePointById: 'updatePointById',
    deletePointById: 'deletePointById',

    // Roles Permissions
    createRole: 'createRole',
    getAllRoles: 'getAllRoles',
    getRoleById: 'getRoleById',
    updateRoleById: 'updateRoleById',
    deleteRoleById: 'deleteRoleById',

    // Role Permission Permissions
    getRolePermissionByRoleId: 'getRolePermissionByRoleId',
    toggleRolePermissionById: 'toggleRolePermissionById',
    deleteRolePermissionById: 'deleteRolePermissionById',
    deleteAllRolePermissionByRole: 'deleteAllRolePermissionByRole',

    // Distribution Routes Permissions


    // Distribution Route Points Permissions


    // Users Permissions


    // User Access Permissions

    
    readAppConfig: 'readAppConfig',
    updateAppConfig: 'updateAppConfig',

    readPoint: 'readPoint',
    updatePoint: 'updatePoint',
    deletePoint: 'deletePoint',
    createUser: 'createUser',
    readUser: 'readUser',
    updateUser: 'updateUser',
    deleteUser: 'deleteUser',
    recoverPassword: 'recoverPassword',
    readLog: 'readLog',
    createRoute: 'createRoute',
    readRoute: 'readRoute',
    updateRoute: 'updateRoute',
    deleteRoute: 'deleteRoute',
    completeRoute: 'completeRoute',
    createReport: 'createReport',
    readReport: 'readReport',
    updateReport: 'updateReport',
    deleteReport: 'deleteReport',
};
