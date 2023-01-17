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
	startTime?: Date;
	endTime?: Date;
	createdOn: Date;
	updatedOn: Date;
	deleted: boolean;
}