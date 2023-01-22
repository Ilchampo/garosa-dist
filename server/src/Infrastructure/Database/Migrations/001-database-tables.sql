-- create database and use database
CREATE DATABASE garosa_dist_prod;
USE garosa_dist_prod;

-- garosa_dist_prod.application_configuration definition

CREATE TABLE `application_configuration` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `language` varchar(255) NOT NULL,
  `maxRadius` decimal(10,0) NOT NULL,
  `maxPointsPerRoute` int(11) NOT NULL,
  `createdOn` datetime NOT NULL,
  `updatedOn` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- garosa_dist_prod.`point` definition

CREATE TABLE `point` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pointName` varchar(255) NOT NULL,
  `pointDescription` varchar(255) NOT NULL,
  `pointImage` varchar(255) DEFAULT NULL,
  `longitude` decimal(10,0) NOT NULL,
  `latitude` decimal(10,0) NOT NULL,
  `createdOn` datetime NOT NULL,
  `updatedOn` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- garosa_dist_prod.`role` definition

CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleName` varchar(255) NOT NULL,
  `roleDescription` varchar(255) NOT NULL,
  `createdOn` datetime NOT NULL,
  `updatedOn` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roleName` (`roleName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- garosa_dist_prod.`user` definition

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdOn` datetime NOT NULL,
  `updatedOn` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- garosa_dist_prod.log definition

CREATE TABLE `log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `logName` varchar(255) NOT NULL,
  `logDescription` varchar(255) NOT NULL,
  `logSource` varchar(255) NOT NULL,
  `logStatus` int(11) NOT NULL,
  `createdOn` datetime NOT NULL,
  `updatedOn` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `log_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- garosa_dist_prod.role_permission definition

CREATE TABLE `role_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleId` int(11) NOT NULL,
  `permissionName` varchar(255) NOT NULL,
  `permissionDescription` varchar(255) NOT NULL,
  `permissionDefault` tinyint(1) NOT NULL DEFAULT 0,
  `createdOn` datetime NOT NULL,
  `updatedOn` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissionName` (`permissionName`),
  UNIQUE KEY `permissionDescription` (`permissionDescription`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `role_permission_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- garosa_dist_prod.route definition

CREATE TABLE `route` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `supervisorId` int(11) NOT NULL,
  `distributorId` int(11) NOT NULL,
  `routeTitle` varchar(255) NOT NULL,
  `routeDescription` varchar(255) NOT NULL,
  `routeStatus` int(11) NOT NULL,
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `createdOn` datetime NOT NULL,
  `updatedOn` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `supervisorId` (`supervisorId`),
  KEY `distributorId` (`distributorId`),
  CONSTRAINT `route_ibfk_1` FOREIGN KEY (`supervisorId`) REFERENCES `user` (`id`),
  CONSTRAINT `route_ibfk_2` FOREIGN KEY (`distributorId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- garosa_dist_prod.route_point definition

CREATE TABLE `route_point` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `routeId` int(11) NOT NULL,
  `pointId` int(11) NOT NULL,
  `reportTitle` varchar(255) DEFAULT NULL,
  `reportDescription` varchar(255) DEFAULT NULL,
  `routePointStatus` int(11) NOT NULL,
  `reportImageOne` varchar(255) DEFAULT NULL,
  `reportImageTwo` varchar(255) DEFAULT NULL,
  `reportImageThree` varchar(255) DEFAULT NULL,
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `createdOn` datetime NOT NULL,
  `updatedOn` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `routeId` (`routeId`),
  KEY `pointId` (`pointId`),
  CONSTRAINT `route_point_ibfk_1` FOREIGN KEY (`routeId`) REFERENCES `route` (`id`),
  CONSTRAINT `route_point_ibfk_2` FOREIGN KEY (`pointId`) REFERENCES `point` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- garosa_dist_prod.user_access definition

CREATE TABLE `user_access` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `roleId` int(11) NOT NULL,
  `createdOn` datetime NOT NULL,
  `updatedOn` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `user_access_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `user_access_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;