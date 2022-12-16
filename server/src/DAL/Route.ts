import { DataTypes } from 'sequelize';
import { sequelize } from '../Infrastructure/Database/Database';

import { RoutePoint } from './RoutePoint';

export interface IRoute {
    id?: number;
    supervisorId?: number;
    distributorId?: number;
    routeTitle?: string;
    routeDescription?: string;
    routeStatus?: number;
    startTime?: Date;
    endTime?: Date;
    createdOn?: Date;
    updatedOn?: Date;
    deleted?: boolean;
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
                model: 'User',
                key: 'id',
            },
        },
        distributorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id',
            },
        },
        routeName: {
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
            defaultValue: Date.now(),
        },
        updatedOn: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now(),
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

Route.hasMany(RoutePoint);
RoutePoint.belongsTo(Route, {
    foreignKey: 'routeId',
    targetKey: 'id',
    as: 'route_point_route_FK',
});
