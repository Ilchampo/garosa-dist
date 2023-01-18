export interface RouteInterface {
	id?: number;
	supervisorId: number;
	distributorId: number;
	routeTitle: string;
	routeDescription: string;
	routeStatus: number;
	startTime?: number;
	endTime?: number;
	createdOn: number;
	updatedOn: number;
	deleted: boolean;
}
