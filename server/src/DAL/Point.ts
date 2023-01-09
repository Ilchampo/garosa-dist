import { DataTypes } from 'sequelize';
import { sequelize } from '../Infrastructure/Database/Database';

// import { RoutePoint } from './RoutePoint';

export interface IPoint {
	id: number;
	pointName: string;
	pointDescription: string;
	pointImage?: string;
	longitude: number;
	latitude: number;
	createdOn: Date;
	updatedOn: Date;
	deleted: boolean;
}

export const Point = sequelize.define(
	'Point',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		pointName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		pointDescription: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		pointImage: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		longitude: {
			type: DataTypes.DECIMAL,
			allowNull: false,
		},
		latitude: {
			type: DataTypes.DECIMAL,
			allowNull: false,
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
		tableName: 'point',
		timestamps: false,
	}
);
