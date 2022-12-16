import { DataTypes } from 'sequelize';
import { sequelize } from '../Infrastructure/Database/Database';

import { UserAccess } from './UserAccess';
import { Log } from './Log';
import { Route } from './Route';

export interface IUser {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    createdOn?: Date;
    updatedOn?: Date;
    deleted?: boolean;
}

export const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
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
        tableName: 'user',
        timestamps: false,
    }
);

User.hasMany(UserAccess);
UserAccess.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: 'user_access_role_FK',
});

User.hasMany(Route);
Route.belongsTo(User, {
    foreignKey: 'supervisorId',
    targetKey: 'id',
    as: 'route_supervisor_FK',
});

User.hasMany(Route);
Route.belongsTo(User, {
    foreignKey: 'distributorId',
    targetKey: 'id',
    as: 'route_distributor_FK',
});

User.hasMany(Log);
Log.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: 'log_user_FK',
});
