export interface PointInterface {
	id?: number;
	pointName: string;
	pointDescription: string;
	pointImage?: string;
	longitude: number;
	latitude: number;
	createdOn: Date;
	updatedOn: Date;
	deleted: boolean;
}