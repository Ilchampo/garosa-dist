export interface RolePermissionInterface {
	id?: number;
	roleId: number;
	permissionName: string;
	permissionDescription: string;
	permissionDefault: boolean;
	createdOn: number;
	updatedOn: number;
	deleted: boolean;
}
