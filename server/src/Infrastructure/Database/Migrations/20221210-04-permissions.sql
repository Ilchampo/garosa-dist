-- Script: 20221210-04-permissions.sql
-- Created by: Pablo Beltran
-- Description: Insert role permissions

-- Administrator Role Permissions

INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(1, 1, 'canCreateUser', 1, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(2, 1, 'canReadUser', 1, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(3, 1, 'canUpdateUser', 1, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(4, 1, 'canDeleteUser', 1, NOW(), NOW(), 0);

INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(5, 1, 'canCreateDistributionPoint', 1, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(6, 1, 'canReadDistributionPoint', 1, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(7, 1, 'canUpdateDistributionPoint', 1, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(8, 1, 'canDeleteDistributionPoint', 1, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(9, 1, 'canSelectDistributionPoint', 0, NOW(), NOW(), 0);

INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(10, 1, 'canCreateDistributionRoute', 0, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(11, 1, 'canReadDistributionRoute', 1, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(12, 1, 'canUpdateDistributionRoute', 0, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(13, 1, 'canDeleteDistributionRoute', 1, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(14, 1, 'canAcceptDistributionRoute', 0, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(15, 1, 'canCompleteDistributionRoute', 0, NOW(), NOW(), 0);

INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(16, 1, 'canCreateReport', 0, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(17, 1, 'canReadReport', 1, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(18, 1, 'canUpdateReport', 0, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(19, 1, 'canDeleteReport', 1, NOW(), NOW(), 0);

-- Supervisor Role Permissions

INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(20, 2, 'canCreateUser', 0, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(21, 2, 'canReadUser', 1, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(22, 2, 'canUpdateUser', 0, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(23, 2, 'canDeleteUser', 0, NOW(), NOW(), 0);

INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(24, 2, 'canCreateDistributionPoint', 0, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(25, 2, 'canReadDistributionPoint', 1, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(26, 2, 'canUpdateDistributionPoint', 0, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(27, 2, 'canDeleteDistributionPoint', 0, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(28, 2, 'canSelectDistributionPoint', 1, NOW(), NOW(), 0);

INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(29, 2, 'canCreateDistributionRoute', 1, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(30, 2, 'canReadDistributionRoute', 1, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(31, 2, 'canUpdateDistributionRoute', 1, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(32, 2, 'canDeleteDistributionRoute', 1, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(33, 2, 'canAcceptDistributionRoute', 0, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(34, 2, 'canCompleteDistributionRoute', 0, NOW(), NOW(), 0);

INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(35, 2, 'canCreateReport', 0, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(36, 2, 'canReadReport', 1, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(37, 2, 'canUpdateReport', 0, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(38, 2, 'canDeleteReport', 0, NOW(), NOW(), 0);

-- Distributor Role Permissions

INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(39, 3, 'canCreateUser', 0, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(40, 3, 'canReadUser', 1, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(41, 3, 'canUpdateUser', 0, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(42, 3, 'canDeleteUser', 0, NOW(), NOW(), 0);

INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(43, 3, 'canCreateDistributionPoint', 0, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(44, 3, 'canReadDistributionPoint', 1, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(45, 3, 'canUpdateDistributionPoint', 0, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(46, 3, 'canDeleteDistributionPoint', 0, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(47, 3, 'canSelectDistributionPoint', 0, NOW(), NOW(), 0);

INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(48, 3, 'canCreateDistributionRoute', 0, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(49, 3, 'canReadDistributionRoute', 1, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(50, 3, 'canUpdateDistributionRoute', 0, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(51, 3, 'canDeleteDistributionRoute', 0, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(52, 3, 'canAcceptDistributionRoute', 1, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(53, 3, 'canCompleteDistributionRoute', 1, NOW(), NOW(), 0);

INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(54, 3, 'canCreateReport', 1, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(55, 3, 'canReadReport', 1, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(56, 3, 'canUpdateReport', 1, NOW(), NOW(), 0);
INSERT IGNORE INTO garosa_dist_dev.role_permission (id, roleId, permissionName, permissionDefault, createdOn, updatedOn, deleted)
VALUES(57, 3, 'canDeleteReport', 0, NOW(), NOW(), 0);