CREATE DATABASE garosa_dist_prod;
USE garosa_dist_prod;

-- garosa_dist_dev.application_configuration definition

CREATE TABLE IF NOT EXISTS `application_configuration` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier for application configuration',
  `language` varchar(100) NOT NULL COMMENT 'Language of the application',
  `maxRadius` decimal(10,0) NOT NULL COMMENT 'Maximum radius from the distribution point',
  `maxPointsPerRoute` int(11) NOT NULL COMMENT 'Max distribution points per distribution route',
  `createdOn` datetime NOT NULL COMMENT 'When the record was created',
  `updatedOn` datetime NOT NULL COMMENT 'When the record was last updated',
  `deleted` tinyint(1) NOT NULL COMMENT 'Activeness of record',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Table to store the application configuration, single record that should not be deleted';


-- garosa_dist_dev.`point` definition

CREATE TABLE IF NOT EXISTS `point` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier for distribution point',
  `pointName` varchar(100) NOT NULL COMMENT 'Name of the distribution point',
  `pointDescription` varchar(1000) NOT NULL COMMENT 'Description of the distribution point',
  `pointImage` varchar(1000) DEFAULT NULL COMMENT 'Image of the distribution point',
  `longitude` decimal(10,8) NOT NULL COMMENT 'Longitude of the distribution point',
  `latitude` decimal(10,8) NOT NULL COMMENT 'Latitude of the distribution point',
  `createdOn` datetime NOT NULL COMMENT 'When the record was created',
  `updatedOn` datetime NOT NULL COMMENT 'When the record was last updated',
  `deleted` tinyint(1) NOT NULL COMMENT 'Activeness of the record',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Table to store the application distribution points';


-- garosa_dist_dev.`role` definition

CREATE TABLE IF NOT EXISTS `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier for role',
  `roleName` varchar(100) NOT NULL COMMENT 'Name of the role',
  `roleDescription` varchar(1000) NOT NULL COMMENT 'Description of the role',
  `createdOn` datetime NOT NULL COMMENT 'When the record was created',
  `updatedOn` datetime NOT NULL COMMENT 'When the record was last updated',
  `deleted` tinyint(1) NOT NULL COMMENT 'Activeness of the record',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Table to store the roles of the application';


-- garosa_dist_dev.`user` definition

CREATE TABLE IF NOT EXISTS `user` (
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
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Table to store the application users';


-- garosa_dist_dev.log definition

CREATE TABLE IF NOT EXISTS `log` (
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
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Table to store the application logs';


-- garosa_dist_dev.role_permission definition

CREATE TABLE IF NOT EXISTS `role_permission` (
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
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Table to store the permissions for each role of the application';


-- garosa_dist_dev.route definition

CREATE TABLE IF NOT EXISTS `route` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier for distribution route',
  `supervisorId` int(11) NOT NULL COMMENT 'Foreign key for supervisor unique identifier',
  `distributorId` int(11) NOT NULL COMMENT 'Foreign key for distributor unique identifier',
  `routeTitle` varchar(100) NOT NULL COMMENT 'Title of the route',
  `routeDescription` varchar(1000) NOT NULL COMMENT 'Description of the route',
  `routeStatus` int(11) NOT NULL COMMENT 'Status of the route',
  `startTime` datetime DEFAULT NULL COMMENT 'Start time of the route',
  `endTime` datetime DEFAULT NULL COMMENT 'End time of the route',
  `createdOn` datetime NOT NULL COMMENT 'When the record was created',
  `updatedOn` datetime NOT NULL COMMENT 'When the record was last updated',
  `deleted` tinyint(1) NOT NULL COMMENT 'Activeness of the record',
  PRIMARY KEY (`id`),
  KEY `route_distributor_FK` (`distributorId`),
  KEY `route_supervisor_FK` (`supervisorId`),
  CONSTRAINT `route_distributor_FK` FOREIGN KEY (`distributorId`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `route_supervisor_FK` FOREIGN KEY (`supervisorId`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Table to store the application distribution routes created by Supervisors';


-- garosa_dist_dev.route_point definition

CREATE TABLE IF NOT EXISTS `route_point` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier for route point',
  `pointId` int(11) NOT NULL COMMENT 'Foreign key for distribution point unique identifier',
  `routeId` int(11) NOT NULL COMMENT 'Foreign key for the distribution route unique identifier',
  `reportTitle` varchar(100) DEFAULT NULL COMMENT 'Title of the report',
  `reportDescription` varchar(1000) DEFAULT NULL COMMENT 'Description of the report',
  `routePointStatus` int(11) NOT NULL COMMENT 'Status of the route point',
  `reportImageOne` varchar(1000) DEFAULT NULL COMMENT 'First image of the report',
  `reportImageTwo` varchar(1000) DEFAULT NULL COMMENT 'Second image of the report',
  `reportImageThree` varchar(1000) DEFAULT NULL COMMENT 'Thrid image of the report',
  `startTime` datetime DEFAULT NULL COMMENT 'Start time of the route point',
  `endTime` datetime DEFAULT NULL COMMENT 'End time of the route point',
  `createdOn` datetime NOT NULL COMMENT 'When the record was created',
  `updatedOn` datetime NOT NULL COMMENT 'When the record was last updated',
  `deleted` tinyint(1) NOT NULL COMMENT 'Activeness of the record',
  PRIMARY KEY (`id`),
  KEY `route_point_route_FK` (`pointId`),
  CONSTRAINT `route_point_point_FK` FOREIGN KEY (`pointId`) REFERENCES `point` (`id`) ON DELETE CASCADE,
  CONSTRAINT `route_point_route_FK` FOREIGN KEY (`pointId`) REFERENCES `route` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Table to store the application route points of a distribution route';


-- garosa_dist_dev.user_access definition

CREATE TABLE IF NOT EXISTS `user_access` (
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
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Table to store the user access of the application';