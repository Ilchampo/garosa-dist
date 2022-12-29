-- Script: 20221210-04-permissions.sql
-- Created by: Pablo Beltran
-- Description: Insert role permissions
-- Administrator Role Permissions
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        1,
        'readAppConfig',
        'Read application configuration',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        22,
        'readAppConfig',
        'Read application configuration',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        43,
        'readAppConfig',
        'Read application configuration',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        2,
        'updateAppConfig',
        'Update application configuration',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        23,
        'updateAppConfig',
        'Update application configuration',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        44,
        'updateAppConfig',
        'Update application configuration',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        3,
        'createPoint',
        'Create new distribution point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        24,
        'createPoint',
        'Create new distribution point',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        45,
        'createPoint',
        'Create new distribution point',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        4,
        'readPoint',
        'Read distribution point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        25,
        'readPoint',
        'Read distribution point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        46,
        'readPoint',
        'Read distribution point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        5,
        'updatePoint',
        'Update distribution point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        26,
        'updatePoint',
        'Update distribution point',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        47,
        'updatePoint',
        'Update distribution point',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        6,
        'deletePoint',
        'Delete existing distribution point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        27,
        'deletePoint',
        'Delete existing distribution point',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        48,
        'deletePoint',
        'Delete existing distribution point',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        7,
        'createUser',
        'Create new user',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        28,
        'createUser',
        'Create new user',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        49,
        'createUser',
        'Create new user',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        8,
        'readUser',
        'Read user information',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        29,
        'readUser',
        'Read user information',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        50,
        'readUser',
        'Read user information',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        9,
        'updateUser',
        'Update user information',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        30,
        'updateUser',
        'Update user information',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        51,
        'updateUser',
        'Update user information',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        10,
        'deleteUser',
        'Delete existing user',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        31,
        'deleteUser',
        'Delete existing user',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        52,
        'deleteUser',
        'Delete existing user',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        11,
        'recoverPassword',
        'Recover user password',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        32,
        'recoverPassword',
        'Recover user password',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        53,
        'recoverPassword',
        'Recover user password',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        12,
        'readLog',
        'Read log information',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        33,
        'readLog',
        'Read log information',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        54,
        'readLog',
        'Read log information',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        13,
        'createRoute',
        'Create new distribution route',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        34,
        'createRoute',
        'Create new distribution route',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        55,
        'createRoute',
        'Create new distribution route',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        14,
        'readRoute',
        'Read distribution route information',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        35,
        'readRoute',
        'Read distribution route information',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        56,
        'readRoute',
        'Read distribution route information',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        15,
        'updateRoute',
        'Update distribution route',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        36,
        'updateRoute',
        'Update distribution route',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        57,
        'updateRoute',
        'Update distribution route',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        16,
        'deleteRoute',
        'Delete distribution route',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        37,
        'deleteRoute',
        'Delete distribution route',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        58,
        'deleteRoute',
        'Delete distribution route',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        17,
        'completeRoute',
        'Complete distribution route',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        38,
        'completeRoute',
        'Complete distribution route',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        59,
        'completeRoute',
        'Complete distribution route',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        18,
        'createReport',
        'Create new report for distribution point',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        39,
        'createReport',
        'Create new report for distribution point',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        60,
        'createReport',
        'Create new report for distribution point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        19,
        'readReport',
        'Read report from distribution point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        40,
        'readReport',
        'Read report from distribution point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        61,
        'readReport',
        'Read report from distribution point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        20,
        'updateReport',
        'Update report from distribution point',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        41,
        'updateReport',
        'Update report from distribution point',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        62,
        'updateReport',
        'Update report from distribution point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        21,
        'deleteReport',
        'Delete report from distribution point',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        42,
        'deleteReport',
        'Delete report from distribution point',
        0,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.role_permission (
        id,
        roleId,
        permissionName,
        permissionDescription,
        permissionDefault,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        63,
        'deleteReport',
        'Delete report from distribution point',
        1,
        NOW(),
        NOW(),
        0
    );