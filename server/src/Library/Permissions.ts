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
	createRoutePoint: 'createRoutePoint',
	getAllRoutePointsByRouteId: 'getAllRoutePointsByRouteId',
	getRoutePointById: 'getRoutePointById',
	startRoutePointById: 'startRoutePointById',
	uploadRoutePointReport: 'uploadRoutePointReport',
	deleteAllRoutePointsByRouteId: 'deleteAllRoutePointsByRouteId',
	validateCompleteRoutePoints: 'validateCompleteRoutePoints',

	// Users Permissions
	getAllUsers: 'getAllUsers',
	getAllUsersByRole: 'getAllUsersByRole',
	getUserById: 'getUserById',
	createUser: 'createUser',
	editUser: 'editUser',
	changePassword: 'changePassword',
	recoverPassword: 'recoverPassword',
	deleteUser: 'deleteUser',

	// User Access Permissions
	createUserAccess: 'createUserAccess',
	getUserAccessById: 'getUserAccessById',
	deleteUserAccessById: 'deleteUserAccessById',
	deleteAllUserAccess: 'deleteAllUserAccess',
};
