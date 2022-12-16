import { DataTypes } from 'sequelize';
import { sequelize } from '../Infrastructure/Database/Database';

export interface IUserAccess {
    id?: number;
    userId?: number;
    roleId?: number;
    createdOn?: Date;
    updatedOn?: Date;
    deleted?: boolean;
}

export const UserAccess = sequelize.define(
    'UserAccess',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id',
            },
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Role',
                key: 'id',
            },
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
        tableName: 'user_access',
        timestamps: false,
    }
);
