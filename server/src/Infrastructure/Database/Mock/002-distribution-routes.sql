-- Distribution Route Completed
INSERT INTO garosa_dist.route (id, supervisorId, distributorId, routeTitle, routeDescription, routeStatus, startTime, endTime, createdOn, updatedOn, deleted) 
VALUES(1, 3, 4, 'Pharmacys Distribution Route', 'Verify that our product stock is okay', 2, NOW(), NOW(), NOW(), NOW(), 0);
INSERT INTO garosa_dist.route_point (routeId, pointId, reportTitle, reportDescription, routePointStatus, reportImageOne, reportImageTwo, reportImageThree, startTime, endTime, createdOn, updatedOn, deleted) 
VALUES(1, 11, 'Pharmacys Granados', 'I noticed there are a few products on stock, this will require to communicate with this distribution point.', 2, 'https://www.riocentroshopping.com/assets/img/upload/big/3eb4f20a40b7e7dd9860ff7db2b6d3f7.jpg', NULL, NULL, NOW(), NOW(), NOW(), NOW(), 0);
INSERT INTO garosa_dist.route_point (routeId, pointId, reportTitle, reportDescription, routePointStatus, reportImageOne, reportImageTwo, reportImageThree, startTime, endTime, createdOn, updatedOn, deleted) 
VALUES(1, 12, 'Pharmacys El Inca', 'Eveything is okay with this distribution point.', 2, 'https://elbosque.com.ec/pharmacys/wp-content/uploads/sites/165/2020/08/pharmacys-1.jpg', 'https://elbosque.com.ec/pharmacys/wp-content/uploads/sites/165/2020/08/pharmacys-1.jpg', NULL, NOW(), NOW(), NOW(), NOW(), 0);
INSERT INTO garosa_dist.route_point (routeId, pointId, reportTitle, reportDescription, routePointStatus, reportImageOne, reportImageTwo, reportImageThree, startTime, endTime, createdOn, updatedOn, deleted) 
VALUES(1, 13, 'Pharmacys La Prensa', 'Our product advertisement is not placed on the accorded place. This go against our terms. Evidence is attached.', 2, 'https://scalashopping.com/wp-content/uploads/2021/09/WhatsApp-Image-2021-09-24-at-13.56.19.jpeg', 'https://scalashopping.com/wp-content/uploads/2021/09/WhatsApp-Image-2021-09-24-at-13.56.19.jpeg', 'https://scalashopping.com/wp-content/uploads/2021/09/WhatsApp-Image-2021-09-24-at-13.56.19.jpeg', NOW(), NOW(), NOW(), NOW(), 0);
INSERT INTO garosa_dist.log (userId, logName, logDescription, logSource, logStatus, createdOn, updatedOn, deleted) VALUES(3, 'CREATED ROUTE', 'Created distribution route Pharmacys Distribution Route', 'DB: garosa_dist; TB: route, route_point', 1, NOW(), NOW(), 0);
INSERT INTO garosa_dist.log (userId, logName, logDescription, logSource, logStatus, createdOn, updatedOn, deleted) VALUES(4, 'COMPLETED ROUTE', 'Completed distribution route Pharmacys Distribution Route', 'DB: garosa_dist; TB: route, route_point', 1, NOW(), NOW(), 0);

-- Distribution Route Assigned
INSERT INTO garosa_dist.route (id, supervisorId, distributorId, routeTitle, routeDescription, routeStatus, startTime, endTime, createdOn, updatedOn, deleted) 
VALUES(2, 3, 4, 'Fybeca Distribution Route', 'Verify that all our products are placed correctly', 0, NULL, NULL, NOW(), NOW(), 0);
INSERT INTO garosa_dist.route_point (routeId, pointId, reportTitle, reportDescription, routePointStatus, reportImageOne, reportImageTwo, reportImageThree, startTime, endTime, createdOn, updatedOn, deleted) 
VALUES(2, 1, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 0);
INSERT INTO garosa_dist.route_point (routeId, pointId, reportTitle, reportDescription, routePointStatus, reportImageOne, reportImageTwo, reportImageThree, startTime, endTime, createdOn, updatedOn, deleted) 
VALUES(2, 2, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 0);
INSERT INTO garosa_dist.route_point (routeId, pointId, reportTitle, reportDescription, routePointStatus, reportImageOne, reportImageTwo, reportImageThree, startTime, endTime, createdOn, updatedOn, deleted) 
VALUES(2, 3, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 0);
INSERT INTO garosa_dist.route_point (routeId, pointId, reportTitle, reportDescription, routePointStatus, reportImageOne, reportImageTwo, reportImageThree, startTime, endTime, createdOn, updatedOn, deleted) 
VALUES(2, 4, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 0);
INSERT INTO garosa_dist.route_point (routeId, pointId, reportTitle, reportDescription, routePointStatus, reportImageOne, reportImageTwo, reportImageThree, startTime, endTime, createdOn, updatedOn, deleted) 
VALUES(2, 5, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NOW(), NOW(), 0);
INSERT INTO garosa_dist.log (userId, logName, logDescription, logSource, logStatus, createdOn, updatedOn, deleted) VALUES(3, 'CREATED ROUTE', 'Created distribution route Fybeca Distribution Route', 'DB: garosa_dist; TB: route, route_point', 1, NOW(), NOW(), 0);
