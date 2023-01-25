export interface PointInterface {
	id?: number;
	pointName: string;
	pointDescription: string;
	pointImage?: string | null;
	longitude: number;
	latitude: number;
	createdOn: number;
	updatedOn: number;
	deleted: boolean;
}
