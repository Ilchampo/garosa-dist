import { DataTypes } from 'sequelize';
import { sequelize } from '../Infrastructure/Database/Database';

export interface IRolePermission {
	id: number;
	roleId: number;
	permissionName: string;
	permissionDescription: string;
	permissionDefault: boolean;
	createdOn: Date;
	updatedOn: Date;
	deleted: boolean;
}

export const RolePermission = sequelize.define(
	'RolePermission',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		roleId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'role',
				key: 'id',
			},
		},
		permissionName: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		permissionDescription: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		permissionDefault: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		createdOn: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		updatedOn: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		deleted: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	},
	{
		tableName: 'role_permission',
		timestamps: false,
	}
);
