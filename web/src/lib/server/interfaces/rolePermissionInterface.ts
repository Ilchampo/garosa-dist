export interface RolePermissionInterface {
	id?: number;
	roleId: number;
	permissionName: string;
	permissionDescription: string;
	permissionDefault: boolean;
	createdOn: Date;
	updatedOn: Date;
	deleted: boolean;
}