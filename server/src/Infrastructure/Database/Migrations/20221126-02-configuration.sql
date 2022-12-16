-- Script: 20221126-02-configuration.sql
-- Created by: Pablo Beltran
-- Description: Insert default application configuration

INSERT IGNORE INTO application_configuration (id, language, maxRadius, maxPointsPerRoute, updatedOn, createdOn, deleted) 
VALUES(1, 'en_US', 100.00, 20, NOW(), NOW(), 0);