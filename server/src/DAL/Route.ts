import { DataTypes } from 'sequelize';
import { sequelize } from '../Infrastructure/Database/Database';

export interface IRoute {
	id: number;
	supervisorId: number;
	distributorId: number;
	routeTitle: string;
	routeDescription: string;
	routeStatus: number;
	startTime?: Date;
	endTime?: Date;
	createdOn: Date;
	updatedOn: Date;
	deleted: boolean;
}

export const Route = sequelize.define(
	'Route',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		supervisorId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'user',
				key: 'id',
			},
		},
		distributorId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'user',
				key: 'id',
			},
		},
		routeTitle: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		routeDescription: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		routeStatus: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		startTime: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		endTime: {
			type: DataTypes.DATE,
			allowNull: true,
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
		tableName: 'route',
		timestamps: false,
	}
);
