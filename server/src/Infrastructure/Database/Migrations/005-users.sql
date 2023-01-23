INSERT INTO garosa_dist.`user`(id, firstName, lastName, email, password, createdOn, updatedOn, deleted) VALUES(1,'Garosa', 'Master', 'master@garosa.com', '$2b$10$wTrRBj4AUZpkGMNwMPqjNuoxlu.FUSBFsMMn96VK9MDXGwbbPnDhC', NOW(), NOW(), 0);
INSERT INTO garosa_dist.`user`(id, firstName, lastName, email, password, createdOn, updatedOn, deleted) VALUES(2,'Garosa', 'Administrator', 'administrator@garosa.com', '$2b$10$wTrRBj4AUZpkGMNwMPqjNuoxlu.FUSBFsMMn96VK9MDXGwbbPnDhC', NOW(), NOW(), 0);
INSERT INTO garosa_dist.`user`(id, firstName, lastName, email, password, createdOn, updatedOn, deleted) VALUES(3,'Garosa', 'Supervisor', 'supervisor@garosa.com', '$2b$10$wTrRBj4AUZpkGMNwMPqjNuoxlu.FUSBFsMMn96VK9MDXGwbbPnDhC', NOW(), NOW(), 0);
INSERT INTO garosa_dist.`user`(id, firstName, lastName, email, password, createdOn, updatedOn, deleted) VALUES(4,'Garosa', 'Distributor', 'distributor@garosa.com', '$2b$10$wTrRBj4AUZpkGMNwMPqjNuoxlu.FUSBFsMMn96VK9MDXGwbbPnDhC', NOW(), NOW(), 0);

INSERT INTO garosa_dist.user_access(id, userId, roleId, createdOn, updatedOn, deleted)VALUES(1,1,4, NOW(), NOW(), 0);
INSERT INTO garosa_dist.user_access(id, userId, roleId, createdOn, updatedOn, deleted)VALUES(2,2,1, NOW(), NOW(), 0);
INSERT INTO garosa_dist.user_access(id, userId, roleId, createdOn, updatedOn, deleted)VALUES(3,3,2, NOW(), NOW(), 0);
INSERT INTO garosa_dist.user_access(id, userId, roleId, createdOn, updatedOn, deleted)VALUES(4,4,3, NOW(), NOW(), 0);