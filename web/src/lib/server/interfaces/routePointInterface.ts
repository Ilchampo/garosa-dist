export interface RoutePointInterface {
	id?: number;
	routeId: number;
	pointId: number;
	reportTitle: string;
	reportDescription: string;
	routePointStatus: number;
	reportImageOne?: string;
	reportImageTwo?: string;
	reportImageThree?: string;
	startTime?: number;
	endTime?: number;
	createdOn: number;
	updatedOn: number;
	deleted: boolean;
}
