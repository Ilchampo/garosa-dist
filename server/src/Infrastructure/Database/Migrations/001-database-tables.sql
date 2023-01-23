-- create database and use database
CREATE DATABASE garosa_dist;
USE garosa_dist;

-- garosa_dist.application_configuration definition

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
ALTER TABLE `application_configuration` AUTO_INCREMENT=1;

-- garosa_dist.`point` definition

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
ALTER TABLE `point` AUTO_INCREMENT=1;

-- garosa_dist.`role` definition

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
ALTER TABLE `role` AUTO_INCREMENT=1;

-- garosa_dist.`user` definition

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
ALTER TABLE `user` AUTO_INCREMENT=1;

-- garosa_dist.log definition

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
  CONSTRAINT `log_user_id_FK` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
ALTER TABLE `log` AUTO_INCREMENT=1;

-- garosa_dist.role_permission definition

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
  KEY `roleId` (`roleId`),
  CONSTRAINT `role_permission_role_id_FK` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
ALTER TABLE `role_permission` AUTO_INCREMENT=1;

-- garosa_dist.route definition

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
  CONSTRAINT `route_supervisor_id_FK` FOREIGN KEY (`supervisorId`) REFERENCES `user` (`id`),
  CONSTRAINT `route_distributor_id_FK` FOREIGN KEY (`distributorId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
ALTER TABLE `route` AUTO_INCREMENT=1;

-- garosa_dist.route_point definition

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
  CONSTRAINT `route_point_route_id_FK` FOREIGN KEY (`routeId`) REFERENCES `route` (`id`),
  CONSTRAINT `route_point_point_id_FK` FOREIGN KEY (`pointId`) REFERENCES `point` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
ALTER TABLE `route_point` AUTO_INCREMENT=1;

-- garosa_dist.user_access definition

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
  CONSTRAINT `user_access_user_id_FK` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `user_access_role_id_FK` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
ALTER TABLE `user_access` AUTO_INCREMENT=1;