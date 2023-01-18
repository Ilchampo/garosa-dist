export interface PointInterface {
	id?: number;
	pointName: string;
	pointDescription: string;
	pointImage?: string;
	longitude: number;
	latitude: number;
	createdOn: number;
	updatedOn: number;
	deleted: boolean;
}
