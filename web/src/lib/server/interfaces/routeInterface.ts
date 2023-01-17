export interface RouteInterface {
	id?: number;
	supervisorId: number;
	distributorId: number;
	routeTitle: string;
	routeDescription: string;
	routeStatus: number;
	startTime?: Date;
	endTime?: Date;
	createdOn: Date;
	updatedOn: Date;
	deleted: boolean;
}