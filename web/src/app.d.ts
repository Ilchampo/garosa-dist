// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		user?: {
			userId: number;
			roleId: number;
			firstName: string;
			lastName: string;
			email: string;
			createApplicationConfiguration: boolean;
			getApplicationConfiguration: boolean;
			updateApplicationConfiguration: boolean;
			deleteApplicationConfiguration: boolean;
			createLog: boolean;
			getAllLogs: boolean;
			deleteLogById: boolean;
			deleteLogsByUserId: boolean;
			createPoint: boolean;
			getAllPoints: boolean;
			getPointById: boolean;
			updatePointById: boolean;
			deletePointById: boolean;
			createRole: boolean;
			getAllRoles: boolean;
			getRoleById: boolean;
			updateRoleById: boolean;
			deleteRoleById: boolean;
			getRolePermissionByRoleId: boolean;
			toggleRolePermissionById: boolean;
			deleteRolePermissionById: boolean;
			deleteAllRolePermissionByRole: boolean;
			createRoute: boolean;
			getAllRoutes: boolean;
			getAllRoutesBySupervisor: boolean;
			getAllRoutesByDistributor: boolean;
			deleteRoute: boolean;
			completeRoute: boolean;
			createRoutePoint: boolean;
			getAllRoutePointsByRouteId: boolean;
			getRoutePointById: boolean;
			startRoutePointById: boolean;
			uploadRoutePointReport: boolean;
			deleteAllRoutePointsByRouteId: boolean;
			validateCompleteRoutePoints: boolean;
			getAllUsers: boolean;
			getAllUsersByRole: boolean;
			getUserById: boolean;
			createUser: boolean;
			editUser: boolean;
			changePassword: boolean;
			recoverPassword: boolean;
			deleteUser: boolean;
			createUserAccess: boolean;
			getUserAccessById: boolean;
			deleteUserAccessById: boolean;
			deleteAllUserAccess: boolean;
			iat: number;
			exp: number;
		};
	}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}
