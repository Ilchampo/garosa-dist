export interface RoutePointInterface {
	id?: number;
	routeId: number;
	pointId: number;
	reportTitle: string;
	reportDescription: string;
	status: number;
	imageOne?: string;
	imageTwo?: string;
	imageThree?: string;
	startTime?: number;
	endTime?: number;
	createdOn: number;
	updatedOn: number;
	deleted: boolean;
}
