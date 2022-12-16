-- Script: 20221126-03-roles.sql
-- Created by: Pablo Beltran
-- Description: Insert application roles

INSERT IGNORE INTO `role` (id, roleName, roleDescription, createdOn, updatedOn, deleted)
VALUES(1, 'Administrator', 'User who administrates the system processes and entities', NOW(), NOW(), 0);

INSERT IGNORE INTO `role` (id, roleName, roleDescription, createdOn, updatedOn, deleted)
VALUES(2, 'Supervisor', 'User who administrates the distribution routes processes', NOW(), NOW(), 0);

INSERT IGNORE INTO `role` (id, roleName, roleDescription, createdOn, updatedOn, deleted)
VALUES(3, 'Distributor', 'User who completes the distribution routes processes', NOW(), NOW(), 0);