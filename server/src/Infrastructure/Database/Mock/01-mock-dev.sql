-- garosa_dist_dev.application_configuration definition
CREATE TABLE `application_configuration` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier for application configuration',
    `language` varchar(100) NOT NULL COMMENT 'Language of the application',
    `maxRadius` decimal(10, 0) NOT NULL COMMENT 'Maximum radius from the distribution point',
    `maxPointsPerRoute` int(11) NOT NULL COMMENT 'Max distribution points per distribution route',
    `createdOn` datetime NOT NULL COMMENT 'When the record was created',
    `updatedOn` datetime NOT NULL COMMENT 'When the record was last updated',
    `deleted` tinyint(1) NOT NULL COMMENT 'Activeness of record',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'Table to store the application configuration, single record that should not be deleted';
-- garosa_dist_dev.`point` definition
CREATE TABLE `point` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier for distribution point',
    `pointName` varchar(100) NOT NULL COMMENT 'Name of the distribution point',
    `pointDescription` varchar(1000) NOT NULL COMMENT 'Description of the distribution point',
    `pointImage` varchar(1000) DEFAULT NULL COMMENT 'Image of the distribution point',
    `longitude` decimal(10, 8) NOT NULL COMMENT 'Longitude of the distribution point',
    `latitude` decimal(10, 8) NOT NULL COMMENT 'Latitude of the distribution point',
    `createdOn` datetime NOT NULL COMMENT 'When the record was created',
    `updatedOn` datetime NOT NULL COMMENT 'When the record was last updated',
    `deleted` tinyint(1) NOT NULL COMMENT 'Activeness of the record',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 21 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'Table to store the application distribution points';
-- garosa_dist_dev.`role` definition
CREATE TABLE `role` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier for role',
    `roleName` varchar(100) NOT NULL COMMENT 'Name of the role',
    `roleDescription` varchar(1000) NOT NULL COMMENT 'Description of the role',
    `createdOn` datetime NOT NULL COMMENT 'When the record was created',
    `updatedOn` datetime NOT NULL COMMENT 'When the record was last updated',
    `deleted` tinyint(1) NOT NULL COMMENT 'Activeness of the record',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'Table to store the roles of the application';
-- garosa_dist_dev.`user` definition
CREATE TABLE `user` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier for user',
    `firstName` varchar(100) NOT NULL COMMENT 'Firstname of the user',
    `lastName` varchar(100) NOT NULL COMMENT 'Lastname of the user',
    `email` varchar(100) NOT NULL COMMENT 'Email of the user',
    `password` varchar(1000) NOT NULL COMMENT 'Password of the user',
    `createdOn` datetime NOT NULL COMMENT 'When the record was created',
    `updatedOn` datetime NOT NULL COMMENT 'When the record was last updated',
    `deleted` tinyint(1) NOT NULL COMMENT 'Activeness of the record',
    PRIMARY KEY (`id`),
    KEY `user_email_IDX` (`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 63 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'Table to store the application users';
-- garosa_dist_dev.log definition
CREATE TABLE `log` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier for log',
    `userId` int(11) NOT NULL COMMENT 'Foreign key for user unique identifier',
    `logName` varchar(100) NOT NULL COMMENT 'Name of the log',
    `logDescription` varchar(100) NOT NULL COMMENT 'Description of the log',
    `logSource` varchar(1000) NOT NULL COMMENT 'Source of the log',
    `logStatus` int(11) NOT NULL COMMENT 'Status of the log',
    `createdOn` datetime NOT NULL COMMENT 'When the record was created',
    `updatedOn` datetime NOT NULL COMMENT 'When the record was last updated',
    `deleted` tinyint(1) NOT NULL COMMENT 'Activeness of the record',
    PRIMARY KEY (`id`),
    KEY `log_user_FK` (`userId`),
    CONSTRAINT `log_user_FK` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 34 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'Table to store the application logs';
-- garosa_dist_dev.role_permission definition
CREATE TABLE `role_permission` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier for the role permission',
    `roleId` int(11) NOT NULL COMMENT 'Foreign key for role unique identifier',
    `permissionName` varchar(100) NOT NULL COMMENT 'Name of the role permission',
    `permissionDescription` varchar(100) NOT NULL COMMENT 'Description of role permission',
    `permissionDefault` tinyint(1) NOT NULL COMMENT 'Default value for the role permission',
    `createdOn` datetime NOT NULL COMMENT 'When the record was created',
    `updatedOn` datetime NOT NULL COMMENT 'When the record was last updated',
    `deleted` tinyint(1) NOT NULL COMMENT 'Activeness of the record',
    PRIMARY KEY (`id`),
    KEY `role_permission_role_FK` (`roleId`),
    CONSTRAINT `role_permission_role_FK` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 58 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'Table to store the permissions for each role of the application';
-- garosa_dist_dev.route definition
CREATE TABLE `route` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier for distribution route',
    `supervisorId` int(11) NOT NULL COMMENT 'Foreign key for supervisor unique identifier',
    `distributorId` int(11) NOT NULL COMMENT 'Foreign key for distributor unique identifier',
    `routeTitle` varchar(100) NOT NULL COMMENT 'Title of the route',
    `routeDescription` varchar(1000) NOT NULL COMMENT 'Description of the route',
    `routeStatus` int(11) NOT NULL COMMENT 'Status of the route',
    `startTime` datetime NOT NULL COMMENT 'Start time of the route',
    `endTime` datetime NOT NULL COMMENT 'End time of the route',
    `createdOn` datetime NOT NULL COMMENT 'When the record was created',
    `updatedOn` datetime NOT NULL COMMENT 'When the record was last updated',
    `deleted` tinyint(1) NOT NULL COMMENT 'Activeness of the record',
    PRIMARY KEY (`id`),
    KEY `route_distributor_FK` (`distributorId`),
    KEY `route_supervisor_FK` (`supervisorId`),
    CONSTRAINT `route_distributor_FK` FOREIGN KEY (`distributorId`) REFERENCES `user` (`id`) ON DELETE CASCADE,
    CONSTRAINT `route_supervisor_FK` FOREIGN KEY (`supervisorId`) REFERENCES `user` (`id`) ON DELETE CASCADE,
    CONSTRAINT `route_user_FK` FOREIGN KEY (`supervisorId`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'Table to store the application distribution routes created by Supervisors';
-- garosa_dist_dev.route_point definition
CREATE TABLE `route_point` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier for route point',
    `pointId` int(11) NOT NULL COMMENT 'Foreign key for distribution point unique identifier',
    `routeId` int(11) NOT NULL COMMENT 'Foreign key for the distribution route unique identifier',
    `reportTitle` varchar(100) NOT NULL COMMENT 'Title of the report',
    `reportDescription` varchar(1000) NOT NULL COMMENT 'Description of the report',
    `routePointStatus` int(11) NOT NULL COMMENT 'Status of the route point',
    `reportImageOne` varchar(1000) DEFAULT NULL COMMENT 'First image of the report',
    `reportImageTwo` varchar(1000) DEFAULT NULL COMMENT 'Second image of the report',
    `reportImageThree` varchar(1000) DEFAULT NULL COMMENT 'Thrid image of the report',
    `startTime` datetime NOT NULL COMMENT 'Start time of the route point',
    `endTime` datetime NOT NULL COMMENT 'End time of the route point',
    `createdOn` datetime NOT NULL COMMENT 'When the record was created',
    `updatedOn` datetime NOT NULL COMMENT 'When the record was last updated',
    `deleted` tinyint(1) NOT NULL COMMENT 'Activeness of the record',
    PRIMARY KEY (`id`),
    KEY `route_point_route_FK` (`pointId`),
    CONSTRAINT `route_point_point_FK` FOREIGN KEY (`pointId`) REFERENCES `point` (`id`) ON DELETE CASCADE,
    CONSTRAINT `route_point_route_FK` FOREIGN KEY (`pointId`) REFERENCES `route` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'Table to store the application route points of a distribution route';
-- garosa_dist_dev.user_access definition
CREATE TABLE `user_access` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier for user access',
    `userId` int(11) NOT NULL COMMENT 'Foreign key for user unique identifier',
    `roleId` int(11) NOT NULL COMMENT 'Foreign key for role unique identifier',
    `createdOn` datetime NOT NULL COMMENT 'When the record was created',
    `updatedOn` datetime NOT NULL COMMENT 'When the record was last updated',
    `deleted` tinyint(1) NOT NULL COMMENT 'Activeness of the record',
    PRIMARY KEY (`id`),
    KEY `user_access_role_FK` (`roleId`),
    KEY `user_access_user_FK` (`userId`),
    CONSTRAINT `user_access_role_FK` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE,
    CONSTRAINT `user_access_user_FK` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 56 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'Table to store the user access of the application';
-- INSERT APPLICATION CONFIGURATION
INSERT INTO garosa_dist_dev.application_configuration(
        id,
        `language`,
        maxRadius,
        maxPointsPerRoute,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(1, 'en_US', 100, 20, NOW(), NOW(), 0);
-- INSERT ROLES
INSERT INTO garosa_dist_dev.`role`(
        id,
        roleName,
        roleDescription,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        1,
        'Administrator',
        'User who manages the users, dist points and app configuration',
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`role`(
        id,
        roleName,
        roleDescription,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        2,
        'Supervisor',
        'User who creates distribution routes tasks',
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`role`(
        id,
        roleName,
        roleDescription,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        3,
        'Distributor',
        'User who completes distribution routes tasks',
        NOW(),
        NOW(),
        0
    );
-- INSERT ROLE PERMISSIONS
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
        2,
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
        3,
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
        1,
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
        2,
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
        3,
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
        1,
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
        2,
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
        3,
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
        1,
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
        2,
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
        3,
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
        1,
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
        2,
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
        3,
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
        1,
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
        2,
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
        3,
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
        1,
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
        2,
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
        3,
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
        1,
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
        2,
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
        3,
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
        1,
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
        2,
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
        3,
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
        1,
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
        2,
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
        3,
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
        1,
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
        2,
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
        3,
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
        1,
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
        2,
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
        3,
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
        1,
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
        2,
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
        3,
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
        1,
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
        2,
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
        3,
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
        1,
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
        2,
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
        3,
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
        1,
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
        2,
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
        3,
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
        1,
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
        2,
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
        3,
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
        1,
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
        2,
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
        3,
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
        1,
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
        2,
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
        3,
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
        1,
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
        2,
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
        3,
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
        1,
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
        2,
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
        3,
        'deleteReport',
        'Delete report from distribution point',
        1,
        NOW(),
        NOW(),
        0
    );
-- INSERT USERS
INSERT INTO garosa_dist_dev.`user`(
        id,
        firstName,
        lastName,
        email,
        password,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        1,
        'Sonia',
        'Administrator',
        'administrator@garosa.com',
        '$2b$10$wTrRBj4AUZpkGMNwMPqjNuoxlu.FUSBFsMMn96VK9MDXGwbbPnDhC',
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`user`(
        id,
        firstName,
        lastName,
        email,
        password,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        2,
        'Lauren',
        'Supervisor',
        'supervisor@garosa.com',
        '$2b$10$.9VaDu/cUQYM.U8C7nLP..4R38/kfAnrrGF99R5UcevpyrmOxeitW',
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`user`(
        id,
        firstName,
        lastName,
        email,
        password,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        3,
        'Marlon',
        'Haynes',
        'haynes@garosa.com',
        '$2b$10$.9VaDu/cUQYM.U8C7nLP..4R38/kfAnrrGF99R5UcevpyrmOxeitW',
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`user`(
        id,
        firstName,
        lastName,
        email,
        password,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        4,
        'Amos',
        'Long',
        'long@garosa.com',
        '$2b$10$.9VaDu/cUQYM.U8C7nLP..4R38/kfAnrrGF99R5UcevpyrmOxeitW',
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`user`(
        id,
        firstName,
        lastName,
        email,
        password,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        5,
        'Joy',
        'Wright',
        'wright@garosa.com',
        '$2b$10$.9VaDu/cUQYM.U8C7nLP..4R38/kfAnrrGF99R5UcevpyrmOxeitW',
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`user`(
        id,
        firstName,
        lastName,
        email,
        password,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        6,
        'Bill',
        'Chapman',
        'chapman@garosa.com',
        '$2b$10$.9VaDu/cUQYM.U8C7nLP..4R38/kfAnrrGF99R5UcevpyrmOxeitW',
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`user`(
        id,
        firstName,
        lastName,
        email,
        password,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        7,
        'Matthew',
        'Distributor',
        'distributor@garosa.com',
        '$2b$10$.9VaDu/cUQYM.U8C7nLP..4R38/kfAnrrGF99R5UcevpyrmOxeitW',
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`user`(
        id,
        firstName,
        lastName,
        email,
        password,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        8,
        'Mario',
        'Goodwin',
        'goodwin@garosa.com',
        '$2b$10$.9VaDu/cUQYM.U8C7nLP..4R38/kfAnrrGF99R5UcevpyrmOxeitW',
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`user`(
        id,
        firstName,
        lastName,
        email,
        password,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        9,
        'Alma',
        'Copeland',
        'copeland@garosa.com',
        '$2b$10$.9VaDu/cUQYM.U8C7nLP..4R38/kfAnrrGF99R5UcevpyrmOxeitW',
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`user`(
        id,
        firstName,
        lastName,
        email,
        password,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        10,
        'Colin',
        'Jones',
        'jones@garosa.com',
        '$2b$10$.9VaDu/cUQYM.U8C7nLP..4R38/kfAnrrGF99R5UcevpyrmOxeitW',
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`user`(
        id,
        firstName,
        lastName,
        email,
        password,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        11,
        'Krystal',
        'Black',
        'black@garosa.com',
        '$2b$10$.9VaDu/cUQYM.U8C7nLP..4R38/kfAnrrGF99R5UcevpyrmOxeitW',
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`user`(
        id,
        firstName,
        lastName,
        email,
        password,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        12,
        'Alison',
        'Hoffman',
        'hoffman@garosa.com',
        '$2b$10$.9VaDu/cUQYM.U8C7nLP..4R38/kfAnrrGF99R5UcevpyrmOxeitW',
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`user`(
        id,
        firstName,
        lastName,
        email,
        password,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        13,
        'Joe',
        'Porter',
        'porter@garosa.com',
        '$2b$10$.9VaDu/cUQYM.U8C7nLP..4R38/kfAnrrGF99R5UcevpyrmOxeitW',
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`user`(
        id,
        firstName,
        lastName,
        email,
        password,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        14,
        'Rufus',
        'Dunn',
        'dunn@garosa.com',
        '$2b$10$.9VaDu/cUQYM.U8C7nLP..4R38/kfAnrrGF99R5UcevpyrmOxeitW',
        NOW(),
        NOW(),
        0
    );
-- INSERT USER ACCESS
INSERT INTO garosa_dist_dev.user_access(
        id,
        userId,
        roleId,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(1, 1, 1, NOW(), NOW(), 0);
INSERT INTO garosa_dist_dev.user_access(
        id,
        userId,
        roleId,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(2, 2, 2, NOW(), NOW(), 0);
INSERT INTO garosa_dist_dev.user_access(
        id,
        userId,
        roleId,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(3, 3, 2, NOW(), NOW(), 0);
INSERT INTO garosa_dist_dev.user_access(
        id,
        userId,
        roleId,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(4, 4, 2, NOW(), NOW(), 0);
INSERT INTO garosa_dist_dev.user_access(
        id,
        userId,
        roleId,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(5, 5, 2, NOW(), NOW(), 0);
INSERT INTO garosa_dist_dev.user_access(
        id,
        userId,
        roleId,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(6, 6, 2, NOW(), NOW(), 0);
INSERT INTO garosa_dist_dev.user_access(
        id,
        userId,
        roleId,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(7, 7, 3, NOW(), NOW(), 0);
INSERT INTO garosa_dist_dev.user_access(
        id,
        userId,
        roleId,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(8, 8, 3, NOW(), NOW(), 0);
INSERT INTO garosa_dist_dev.user_access(
        id,
        userId,
        roleId,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(9, 9, 3, NOW(), NOW(), 0);
INSERT INTO garosa_dist_dev.user_access(
        id,
        userId,
        roleId,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(10, 10, 3, NOW(), NOW(), 0);
INSERT INTO garosa_dist_dev.user_access(
        id,
        userId,
        roleId,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(11, 11, 3, NOW(), NOW(), 0);
INSERT INTO garosa_dist_dev.user_access(
        id,
        userId,
        roleId,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(12, 12, 3, NOW(), NOW(), 0);
INSERT INTO garosa_dist_dev.user_access(
        id,
        userId,
        roleId,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(13, 13, 3, NOW(), NOW(), 0);
INSERT INTO garosa_dist_dev.user_access(
        id,
        userId,
        roleId,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(14, 14, 3, NOW(), NOW(), 0);
-- INSERT DISTRIBUTION POINTS
INSERT INTO garosa_dist_dev.`point`(
        id,
        pointName,
        pointDescription,
        pointImage,
        longitude,
        latitude,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        1,
        'Fybeca Gasolinera Primax',
        'VG8H+MQH, Av. Eloy Alfaro, Quito 170514',
        'https://insiderlatam.com/wp-content/uploads/2022/07/fybeca.jpg',
        -0.133106,
        -78.470527,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`point`(
        id,
        pointName,
        pointDescription,
        pointImage,
        longitude,
        latitude,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        2,
        'Fybeca Galo Plaza',
        'PLAZA DEL, AV. GALO PLAZA LASO, Y S/N, Quito 170138',
        'https://www.riocentroshopping.com/assets/img/upload/big/7dfd415a2bf1f4496c1a25bf05f7fe17.png',
        -0.13099,
        -78.482108,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`point`(
        id,
        pointName,
        pointDescription,
        pointImage,
        longitude,
        latitude,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        3,
        'Fybeca La Prensa',
        'VG64+RR8, Av. de la Prensa, Quito 170104',
        'https://elbosque.com.ec/fybeca/wp-content/uploads/sites/51/2020/08/FYBECA.jpg',
        -0.137786,
        -78.492953,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`point`(
        id,
        pointName,
        pointDescription,
        pointImage,
        longitude,
        latitude,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        4,
        'Fybeca 6 de Diciembre',
        'RGXF+VPF, Av. 6 de Diciembre, Quito 170502',
        'https://ccq.ec/wp-content/uploads/2021/03/Fybeca-Brasil-1024x868.jpg',
        -0.150105,
        -78.475685,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`point`(
        id,
        pointName,
        pointDescription,
        pointImage,
        longitude,
        latitude,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        5,
        'Fybeca La Luz',
        'RGX8+5CJ, Quito 170138',
        'https://www.eluniverso.com/resizer/mEIUNqBKILMsabyDGT7Tmsa2t3M=/1192x670/smart/filters:quality(70)/cloudfront-us-east-1.images.arcpublishing.com/eluniverso/Y4SEHAHSYFGHTHWUPOAXWUJMYQ.jpg',
        -0.151802,
        -78.483929,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`point`(
        id,
        pointName,
        pointDescription,
        pointImage,
        longitude,
        latitude,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        6,
        'Sana Sana El Inca',
        'Av. El Inca E9-19 entre Av. 6 de diciembre, y, 170502',
        'https://mlps03cbb7ir.i.optimole.com/w:auto/h:auto/q:mauto/https://i0.wp.com/www.visitamoronasantiago.com/wp-content/uploads/2020/07/salud9.jpg?fit=700%2C349&ssl=1',
        -0.153068,
        -78.47673,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`point`(
        id,
        pointName,
        pointDescription,
        pointImage,
        longitude,
        latitude,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        7,
        'Sana Sana Los Alamos',
        'Av. Eloy Alfaro N50-372, Quito 170514',
        'https://sites.google.com/site/farmaciassanasana22/_/rsrc/1484968146894/home/16196333_1278771835522951_1824359805_o%20%281%29.jpg?height=240&width=320',
        -0.143541,
        -78.46922,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`point`(
        id,
        pointName,
        pointDescription,
        pointImage,
        longitude,
        latitude,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        8,
        'Sana Sana La Prensa',
        'Av. de la Prensa 3129 y, Quito 170511',
        'https://pr0.nicelocal.ec/h2C48wil5zzleetd3E-uLQ/1120x700,q85/4px-BW84_n0QJGVPszge3NRBsKw-2VcOifrJIjPYFYkOtaCZxxXQ2ZbmQf8xd6QzLwc7QECS7G6w0eG25VjTPZEsuiE94qkH7l1OG12tlB5UDA6thckj0w',
        -0.139936,
        -78.494111,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`point`(
        id,
        pointName,
        pointDescription,
        pointImage,
        longitude,
        latitude,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        9,
        'Sana Sana Ramon Borja',
        'Calle, Capitán Ramón Borja e7-238, Quito 170502',
        'https://fastly.4sqi.net/img/general/600x600/VUP4DKSGD233PFHNTLUVYGNM2YZ3XBMNRCMIHIU0Y2XHYVOJ.jpg',
        -0.139035,
        -78.474713,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`point`(
        id,
        pointName,
        pointDescription,
        pointImage,
        longitude,
        latitude,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        10,
        'Sana Sana Issac Barrera',
        'Av. 6 de Diciembre N51-157, Quito 170138',
        'https://lh3.googleusercontent.com/p/AF1QipNgPDHEImLvrq2y4GVoAaCk0W-7N1kSAalubQtR=s1600-w400',
        -0.140923,
        -78.474069,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`point`(
        id,
        pointName,
        pointDescription,
        pointImage,
        longitude,
        latitude,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        11,
        'Pharmacys Granados',
        'Av. De Los Granados E14-748 y Shuara, Quito 170516',
        'https://www.riocentroshopping.com/assets/img/upload/big/3eb4f20a40b7e7dd9860ff7db2b6d3f7.jpg',
        -0.163668,
        -78.4654,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`point`(
        id,
        pointName,
        pointDescription,
        pointImage,
        longitude,
        latitude,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        12,
        'Pharmacys El Inca',
        'Av. 6 de Diciembre 7726, Quito 170138',
        'https://elbosque.com.ec/pharmacys/wp-content/uploads/sites/165/2020/08/pharmacys-1.jpg',
        -0.150665,
        -78.476086,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`point`(
        id,
        pointName,
        pointDescription,
        pointImage,
        longitude,
        latitude,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        13,
        'Pharmacys La Prensa',
        'Av. de la Prensa N31-39 Y, Quito 170104',
        'https://scalashopping.com/wp-content/uploads/2021/09/WhatsApp-Image-2021-09-24-at-13.56.19.jpeg',
        -0.139765,
        -78.492909,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`point`(
        id,
        pointName,
        pointDescription,
        pointImage,
        longitude,
        latitude,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        14,
        'Pharmacys Rio Coca',
        'Av. Río Coca 25, Quito 170138',
        'https://www.elpaseoshopping.com/assets/img/upload/big/9b62206ece515ce43d60e2f6be4c988f.jpg',
        -0.16178,
        -78.481365,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`point`(
        id,
        pointName,
        pointDescription,
        pointImage,
        longitude,
        latitude,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        15,
        'Pharmacys Brasil',
        'Av. Brasil 2610, Quito 170104',
        'https://www.elpaseoshopping.com/assets/img/upload/big/6a2367a710904ed48e7d852a7f34792e.jpg',
        -0.151566,
        -78.492566,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`point`(
        id,
        pointName,
        pointDescription,
        pointImage,
        longitude,
        latitude,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        16,
        'Cruz Azul La Prensa',
        'Zamora, La Prensa Oe3-86, Quito 170120',
        'https://loaizacomunicaciones.com/wp-content/uploads/ca-servicios-en-pandemia.jpg',
        -0.155,
        -78.489047,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`point`(
        id,
        pointName,
        pointDescription,
        pointImage,
        longitude,
        latitude,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        17,
        'Cruz Azul La Florida',
        'Av La Florida Oe4-46, Quito 170104',
        'https://difare.com.ec/wp-content/uploads/2021/07/DSC_0020-scaled.jpg',
        -0.142726,
        -78.495398,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`point`(
        id,
        pointName,
        pointDescription,
        pointImage,
        longitude,
        latitude,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        18,
        'Cruz Azul Los Shyris',
        'Av. de los Shyris N42-108, Quito 170513',
        'https://loaizacomunicaciones.com/wp-content/uploads/ca-20-anos-web.jpg',
        -0.16517,
        -78.478704,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`point`(
        id,
        pointName,
        pointDescription,
        pointImage,
        longitude,
        latitude,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        19,
        'Cruz Azul Gaspar de Villaroel',
        'Av. de los Shyris 2536, Quito 170135',
        'https://www.riocentroshopping.com/assets/img/upload/big/7b595c4ff7d9a065b3b96af8a7b9d797.jpg',
        -0.169943,
        -78.479811,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.`point`(
        id,
        pointName,
        pointDescription,
        pointImage,
        longitude,
        latitude,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        20,
        'Cruz Azul Cristobal Vaca',
        'Av. Cristóbal Vaca de Castro Oe6-86, Quito',
        'https://ceibosnorte.com/images/LocalesComerciales/cruz-azul.jpg',
        -0.128392,
        -78.499142,
        NOW(),
        NOW(),
        0
    );
-- INSERT LOGS
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        1,
        1,
        'CREATE USER',
        'Created new supervisor user supervisor@garosa.com',
        'DB: garosa_dist_test; TB: user, user_access',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        2,
        1,
        'CREATE USER',
        'Created new supervisor user haynes@garosa.com',
        'DB: garosa_dist_test; TB: user, user_access',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        3,
        1,
        'CREATE USER',
        'Created new supervisor user long@garosa.com',
        'DB: garosa_dist_test; TB: user, user_access',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        4,
        1,
        'CREATE USER',
        'Created new supervisor user wright@garosa.com',
        'DB: garosa_dist_test; TB: user, user_access',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        5,
        1,
        'CREATE USER',
        'Created new supervisor user chapman@garosa.com',
        'DB: garosa_dist_test; TB: user, user_access',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        6,
        1,
        'CREATE USER',
        'Created new distributor user distributor@garosa.com',
        'DB: garosa_dist_test; TB: user, user_access',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        7,
        1,
        'CREATE USER',
        'Created new distributor user goodwin@garosa.com',
        'DB: garosa_dist_test; TB: user, user_access',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        8,
        1,
        'CREATE USER',
        'Created new distributor user copeland@garosa.com',
        'DB: garosa_dist_test; TB: user, user_access',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        9,
        1,
        'CREATE USER',
        'Created new distributor user jones@garosa.com',
        'DB: garosa_dist_test; TB: user, user_access',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        10,
        1,
        'CREATE USER',
        'Created new distributor user black@garosa.com',
        'DB: garosa_dist_test; TB: user, user_access',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        11,
        1,
        'CREATE USER',
        'Created new distributor user hoffman@garosa.com',
        'DB: garosa_dist_test; TB: user, user_access',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        12,
        1,
        'CREATE USER',
        'Created new distributor user porter@garosa.com',
        'DB: garosa_dist_test; TB: user, user_access',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        13,
        1,
        'CREATE USER',
        'Created new distributor user dunn@garosa.com',
        'DB: garosa_dist_test; TB: user, user_access',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        14,
        1,
        'CREATE DIST POINT',
        'Create new dist point Fybeca Gasolinera Primax',
        'DB: garosa_dist_test; TB: point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        15,
        1,
        'CREATE DIST POINT',
        'Create new dist point Fybeca Galo Plaza',
        'DB: garosa_dist_test; TB: point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        16,
        1,
        'CREATE DIST POINT',
        'Create new dist point Fybeca La Prensa',
        'DB: garosa_dist_test; TB: point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        17,
        1,
        'CREATE DIST POINT',
        'Create new dist point Fybeca 6 de Diciembre',
        'DB: garosa_dist_test; TB: point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        18,
        1,
        'CREATE DIST POINT',
        'Create new dist point Fybeca La Luz',
        'DB: garosa_dist_test; TB: point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        19,
        1,
        'CREATE DIST POINT',
        'Create new dist point Sana Sana El Inca',
        'DB: garosa_dist_test; TB: point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        20,
        1,
        'CREATE DIST POINT',
        'Create new dist point Sana Sana Los Alamos',
        'DB: garosa_dist_test; TB: point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        21,
        1,
        'CREATE DIST POINT',
        'Create new dist point Sana Sana La Prensa',
        'DB: garosa_dist_test; TB: point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        22,
        1,
        'CREATE DIST POINT',
        'Create new dist point Sana Sana Ramon Borja',
        'DB: garosa_dist_test; TB: point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        23,
        1,
        'CREATE DIST POINT',
        'Create new dist point Sana Sana Issac Barrera',
        'DB: garosa_dist_test; TB: point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        24,
        1,
        'CREATE DIST POINT',
        'Create new dist point Pharmacys Granados',
        'DB: garosa_dist_test; TB: point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        25,
        1,
        'CREATE DIST POINT',
        'Create new dist point Pharmacys El Inca',
        'DB: garosa_dist_test; TB: point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        26,
        1,
        'CREATE DIST POINT',
        'Create new dist point Pharmacys La Prensa',
        'DB: garosa_dist_test; TB: point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        27,
        1,
        'CREATE DIST POINT',
        'Create new dist point Pharmacys Rio Coca',
        'DB: garosa_dist_test; TB: point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        28,
        1,
        'CREATE DIST POINT',
        'Create new dist point Pharmacys Brasil',
        'DB: garosa_dist_test; TB: point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        29,
        1,
        'CREATE DIST POINT',
        'Create new dist point Cruz Azul La Prensa',
        'DB: garosa_dist_test; TB: point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        30,
        1,
        'CREATE DIST POINT',
        'Create new dist point Cruz Azul La Florida',
        'DB: garosa_dist_test; TB: point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        31,
        1,
        'CREATE DIST POINT',
        'Create new dist point Cruz Azul Los Shyris',
        'DB: garosa_dist_test; TB: point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        32,
        1,
        'CREATE DIST POINT',
        'Create new dist point Cruz Azul Gaspar de Villaroel',
        'DB: garosa_dist_test; TB: point',
        1,
        NOW(),
        NOW(),
        0
    );
INSERT INTO garosa_dist_dev.log(
        id,
        userId,
        logName,
        logDescription,
        logSource,
        logStatus,
        createdOn,
        updatedOn,
        deleted
    )
VALUES(
        33,
        1,
        'CREATE DIST POINT',
        'Create new dist point Cruz Azul Cristobal Vaca',
        'DB: garosa_dist_test; TB: point',
        1,
        NOW(),
        NOW(),
        0
    );