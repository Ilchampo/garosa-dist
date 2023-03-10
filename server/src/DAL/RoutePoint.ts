import { DataTypes } from 'sequelize';
import { sequelize } from '../Infrastructure/Database/Database';

export interface IRoutePoint {
	id: number;
	routeId: number;
	pointId: number;
	reportTitle: string;
	reportDescription: string;
	status: number;
	imageOne?: string;
	imageTwo?: string;
	imageThree?: string;
	startTime?: Date;
	endTime?: Date;
	createdOn: Date;
	updatedOn: Date;
	deleted: boolean;
}

export const RoutePoint = sequelize.define(
	'RoutePoint',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		routeId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'route',
				key: 'id',
			},
		},
		pointId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'point',
				key: 'id',
			},
		},
		reportTitle: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		reportDescription: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		routePointStatus: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		reportImageOne: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		reportImageTwo: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		reportImageThree: {
			type: DataTypes.STRING,
			allowNull: true,
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
		tableName: 'route_point',
		timestamps: false,
	}
);
